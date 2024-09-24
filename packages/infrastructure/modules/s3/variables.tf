variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
}

variable "terraform_backend" {
  description = "Flag to determine if the bucket is used as a Terraform backend (enables versioning and encryption)"
  type        = bool
  default     = false
}

variable "encryption_algorithm" {
  description = "The encryption algorithm to use (AES256 or aws:kms), used if terraform_backend is true"
  type        = string
  default     = "AES256"
}

variable "logging_bucket" {
  description = "The S3 bucket to send access logs to (optional)"
  type        = string
  default     = ""
}

variable "logging_prefix" {
  description = "Prefix for S3 access log files (optional)"
  type        = string
  default     = ""
}

variable "tags" {
  description = "A map of tags to assign to the bucket"
  type        = map(string)
  default = {
    "ManagedBy" = "Terraform"
  }
}
