variable "api_gateway_id" {
  description = "The ID of the API Gateway"
}

variable "api_gateway_resource_id" {
  description = "The resource ID of the API Gateway"
}

variable "http_method" {
  description = "The HTTP method (e.g., GET, POST)"
}

variable "lambda_function_arn" {
  description = "The ARN of the Lambda function"
}

variable "api_gateway_arn" {
  description = "The ARN of the API Gateway"
}

variable "request_parameters" {
  description = "Query parameters for the Lambda integration"
  type        = map(bool)
}

variable "region" {
  type = string
}

variable "uri" {
  type = string
}

variable "account_id" {
  type = string
  
}