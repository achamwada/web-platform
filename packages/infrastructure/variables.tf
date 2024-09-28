variable "region" {
  description = "The AWS region to deploy resources in"
  default     = "eu-west-1"
}

variable "cidr_block" {
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}
