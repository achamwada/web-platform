variable "environment" {
  description = "Deployment environment"
  type = string
  default     = "dev"
}

variable "api_gateway_id" {
  description = "The ID of the API Gateway"
}

variable "api_gateway_root_resource_id" {
  description = "The resource ID of the API Gateway"
}

variable "lambda_env_vars" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
}


variable "segment" {
  type = string
}