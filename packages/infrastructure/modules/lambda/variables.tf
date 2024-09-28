variable "lambda_name" {
  description = "The name of the Lambda function"
}

variable "lambda_handler" {
  description = "The handler for the Lambda function"
}

variable "lambda_runtime" {
  description = "The runtime for the Lambda function"
}

variable "lambda_source_path" {
  description = "The source directory path of the Lambda function"
}

variable "zip_name" {
  description = "The name of the Lambda zip file"
  type = string
  default = "lambda"
}

variable "lambda_env_vars" {
  description = "Environment variables for the Lambda function"
  type        = map(string)
}

variable "lambda_bucket_name" {
  type = string
  default = "web-platform-lambda-code"
  
}