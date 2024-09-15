variable "name" {
  description = "The name of the NLB"
}

variable "vpc_id" {
  description = "The ID of the VPC"
}

variable "subnet_ids" {
  description = "List of subnet IDs for NLB"
  type        = list(string)
}
