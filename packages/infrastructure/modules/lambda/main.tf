data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.lambda_source_path
  output_path = "${var.lambda_source_path}/${var.zip_name}.zip"
}

resource "aws_iam_role" "lambda_role" {
  name = "${var.lambda_name}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action    = "sts:AssumeRole",
        Effect    = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_execution_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "lambda" {
  function_name = var.lambda_name
  handler       = var.lambda_handler
  runtime       = var.lambda_runtime
  role          = aws_iam_role.lambda_role.arn

  s3_bucket     = var.lambda_s3_bucket != "" ? var.lambda_s3_bucket : null
  s3_key        = var.lambda_s3_key != "" ? var.lambda_s3_key : null

   # Reference the zip file created by archive_file
  filename      = data.archive_file.lambda_zip.output_path

  environment {
    variables = var.lambda_env_vars
  }

  # Ensure Lambda is redeployed if code changes
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
}

# API Gateway Method with Dynamic Request Parameters
resource "aws_api_gateway_method" "method" {
  rest_api_id   = var.api_gateway_id
  resource_id   = var.api_gateway_resource_id
  http_method   = var.http_method
  authorization = var.authorization
  
  request_parameters = var.request_parameters
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id            = var.api_gateway_id
  resource_id            = var.api_gateway_resource_id
  http_method            = aws_api_gateway_method.method.http_method
  integration_http_method = "POST"
  type                   = "AWS_PROXY"
  uri                    = aws_lambda_function.lambda.invoke_arn

  request_parameters = { 
    for key, value in var.request_parameters : "integration.request.querystring.${key}" => "method.request.querystring.${key}" 
  }
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${var.api_gateway_arn}/*/*"
}
