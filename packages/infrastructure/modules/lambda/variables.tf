variable "lambda_name" {
  description = "The name of the Lambda function."
  type        = string
}

variable "lambda_handler" {
  description = "The entry point of the Lambda function (e.g., 'src/handlers/contentfulHandler.handler')."
  type        = string
}

variable "lambda_runtime" {
  description = "The Lambda runtime (e.g., 'nodejs18.x')."
  type        = string
  default     = "nodejs18.x"
}

variable "lambda_source_path" {
  description = "The local path of the Lambda zip package to upload."
  type        = string
}

variable "zip_name" {
  type = string
  default = "lambda"
  
}

variable "lambda_s3_bucket" {
  description = "S3 bucket to upload the Lambda code (optional). Leave empty if not using S3."
  type        = string
  default     = ""
}

variable "lambda_s3_key" {
  description = "S3 key for the Lambda code (optional)."
  type        = string
  default     = ""
}

variable "lambda_env_vars" {
  description = "Environment variables to pass to the Lambda function."
  type        = map(string)
  default     = {}
}

# API Gateway Integration Variables
variable "api_gateway_id" {
  description = "The ID of the existing API Gateway."
  type        = string
}

variable "api_gateway_resource_id" {
  description = "The resource ID of the existing API Gateway resource."
  type        = string
}

variable "api_gateway_arn" {
  description = "The ARN of the existing API Gateway to add permissions for Lambda invocation."
  type        = string
}

variable "request_parameters" {
  description = "Map of request parameters and whether they are required."
  type        = map(bool)
  default     = {
    "contentTypeId"  = true
    "contentEntryKey" = false
  }
}

variable "http_method" {
  description = "The HTTP method for the API Gateway (e.g., 'GET', 'POST')."
  type        = string
  default     = "GET"
}

variable "authorization" {
  description = "The authorization type for the API Gateway method (e.g., 'NONE', 'AWS_IAM')."
  type        = string
  default     = "NONE"
}
