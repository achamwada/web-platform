variable "region" {
  description = "The AWS region to deploy resources in"
  default     = "eu-west-1"
}

variable "cidr_block" {
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "environment" {
  description = "Deployment environment"
  type = string
  default     = "dev"
}

variable "request_parameters" {
  type = list(string)
  default = [ "contentTypeId", "contentEntryKey" ]
  
}

variable "account_id" {
  type = string
  default = "975050161127"
}


variable "lambda_env_vars" {
  type = map(string)
  description = "Environment variables for the Lambda function"
}
