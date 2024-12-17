variable "table_name" {
  description = "The name of the DynamoDB table"
  type        = string
}

variable "hash_key" {
  description = "The name of the hash (partition) key"
  type        = string
}

variable "hash_key_type" {
  description = "The type of the hash (partition) key (S for String, N for Number, B for Binary)"
  type        = string
  default     = "S"
}

variable "range_key" {
  description = "The name of the range (sort) key, if any"
  type        = string
  default     = ""
}

variable "range_key_type" {
  description = "The type of the range (sort) key (S for String, N for Number, B for Binary)"
  type        = string
  default     = "S"
}

variable "billing_mode" {
  description = "Billing mode for the DynamoDB table (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "The read capacity for the table (required for PROVISIONED mode)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "The write capacity for the table (required for PROVISIONED mode)"
  type        = number
  default     = 5
}

variable "tags" {
  description = "A map of tags to assign to the table"
  type        = map(string)
  default = {
    "ManagedBy" = "Terraform"
  }
}
