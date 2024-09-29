output "api_gateway_id" {
  description = "The ID of the API Gateway"
  value       = aws_api_gateway_rest_api.api.id
}

output "root_resource_id" {
  description = "The resource ID of the API Gateway"
  value       = aws_api_gateway_rest_api.api.root_resource_id
}
