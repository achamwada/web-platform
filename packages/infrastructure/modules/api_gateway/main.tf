resource "aws_api_gateway_rest_api" "api" {
  name        = var.api_name
  description = var.api_description

  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

resource "aws_ssm_parameter" "api_gateway_id" {
  name        = "/${var.environment}/${var.segment}/api_gateway/id"
  description = "API Gateway ID"
  type        = "String"
  value       = aws_api_gateway_rest_api.api.id
}

resource "aws_ssm_parameter" "api_gateway_root_id" {
  name        = "/${var.environment}/${var.segment}/api_gateway/root_id"
  description = "API Gateway Root Resource ID"
  type        = "String"
  value       = aws_api_gateway_rest_api.api.root_resource_id
}

resource "aws_ssm_parameter" "api_gateway_url" {
  name        = "/${var.environment}/${var.segment}/api_gateway/arn"
  description = "API Gateway arn"
  type        = "String"
  value       = aws_api_gateway_rest_api.api.arn
}
