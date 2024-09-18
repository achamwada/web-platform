variable "api_name" {
  description = "The name of the API Gateway"
}

variable "api_description" {
  description = "The description of the API"
}

variable "path" {
  description = "The path part of the API (e.g., /api)"
}

variable "http_method" {
  description = "The HTTP method (e.g., GET, POST)"
}

variable "integration_uri" {
  description = "The URI of the service (e.g., ALB target group or Lambda function)"
}

variable "stage_name" {
  description = "The deployment stage (e.g., dev, prod)"
}
