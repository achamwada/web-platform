output "api_gateway_id" {
  value       = aws_api_gateway_rest_api.api.id
  description = "The ID of the API Gateway"
}

output "api_gateway_resource_id" {
  value       = aws_api_gateway_resource.resource.id
  description = "The ID of the API Gateway Resource"
}

output "api_gateway_arn" {
  value       = aws_api_gateway_rest_api.api.execution_arn
  description = "The ARN of the API Gateway"
}

output "http_method" {
  value       = var.http_method
  description = "The HTTP method used for the API Gateway"
}
