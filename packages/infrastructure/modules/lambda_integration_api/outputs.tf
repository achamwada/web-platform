output "lambda_integration_status" {
  description = "The status of the Lambda integration"
  value       = aws_api_gateway_integration.lambda_integration.id
}
