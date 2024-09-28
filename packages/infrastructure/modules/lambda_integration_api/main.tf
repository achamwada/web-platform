resource "aws_api_gateway_resource" "content-service" {
  rest_api_id = var.api_gateway_id
  parent_id   = var.api_gateway_resource_id
  path_part   = "content-service"

}

resource "aws_api_gateway_resource" "v2" {
  rest_api_id = var.api_gateway_id
  parent_id   = aws_api_gateway_resource.content-service.id
  path_part   = "v2"

}


resource "aws_api_gateway_request_validator" "get-method" {
  name                        = "QueryRequestValidator"
  rest_api_id                 = var.api_gateway_id
  validate_request_parameters = true
}

resource "aws_api_gateway_method" "get-method" {
  rest_api_id      = var.api_gateway_id
  resource_id      = aws_api_gateway_resource.v2.id
  api_key_required = false
  authorization    = "NONE"
  http_method      = "GET"

  request_parameters = {
    "method.request.querystring.contentEntryKey" = true
    "method.request.querystring.contentType"     = true
  }

  request_validator_id = aws_api_gateway_request_validator.get-method.id

}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = var.api_gateway_id
  resource_id             = var.api_gateway_resource_id
  integration_http_method = "POST"
  http_method             = aws_api_gateway_method.get-method.http_method
  type                    = "AWS_PROXY"  # Use AWS_PROXY for Lambda

  uri                  = var.uri
  passthrough_behavior = "WHEN_NO_TEMPLATES"
  request_templates = {
    "application/json" = file("./utils/get-method-integration-request.vtl")
  }
}


resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.region}:${var.account_id}:${var.api_gateway_id}/*/${var.http_method}"
}

