module "lambda" {
  source             = "../lambda"
  lambda_name        = "talkbot-lambda"
  lambda_handler     = "talkbot-lambda/index.handler"
  lambda_runtime     = "nodejs18.x"
  lambda_source_path = "${path.root}/../apps/lambdas/TalkBot/out/dist/TalkBot"

  lambda_env_vars = var.lambda_env_vars
}

resource "aws_api_gateway_resource" "content_service" {
  rest_api_id = var.api_gateway_id
  parent_id   = var.api_gateway_root_resource_id
  path_part   = "content-service"

}

resource "aws_api_gateway_resource" "v2" {
  rest_api_id = var.api_gateway_id
  parent_id   = aws_api_gateway_resource.content_service.id
  path_part   = "v2"

}

resource "aws_api_gateway_request_validator" "get-method" {
  name                        = "QueryRequestValidator"
  rest_api_id                 = var.api_gateway_id
  validate_request_parameters = true
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id      = var.api_gateway_id
  resource_id      = aws_api_gateway_resource.v2.id
  http_method      = "GET"
  api_key_required = false

  authorization = "NONE"

  request_parameters = {
    "method.request.querystring.contentEntryKey" = true
    "method.request.querystring.contentTypeId"   = true
  }

  request_validator_id = aws_api_gateway_request_validator.get-method.id
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = var.api_gateway_id
  resource_id             = aws_api_gateway_resource.v2.id
  http_method             = aws_api_gateway_method.proxy.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = module.lambda.lambda_function_invoke_arn

  passthrough_behavior = "WHEN_NO_TEMPLATES"
  request_templates = {
    "application/json" = file("${path.root}/utils/get-method-integration-request.vtl")
  }

}

resource "aws_api_gateway_method_response" "proxy" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.v2.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = "200"

}

resource "aws_api_gateway_integration_response" "proxy" {
  rest_api_id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.v2.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = aws_api_gateway_method_response.proxy.status_code



  depends_on = [
    aws_api_gateway_method.proxy,
    aws_api_gateway_integration.lambda_integration
  ]
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    aws_api_gateway_integration.lambda_integration,
  ]

  rest_api_id = var.api_gateway_id
  stage_name  = var.environment

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.content_service,
      aws_api_gateway_resource.v2,
      aws_api_gateway_integration.lambda_integration,
      aws_api_gateway_method.proxy
      ]
    ))
  }

  lifecycle {
    create_before_destroy = true
  }
}


module "method-models" {
  source      = "./api-gateway-schemas"
  rest-api-id = var.api_gateway_id
  resource_id = aws_api_gateway_resource.v2.id
  http_method = aws_api_gateway_method.proxy.http_method

  integration = aws_api_gateway_integration.lambda_integration


}