resource "aws_s3_bucket" "generic_bucket" {
  bucket = var.bucket_name

  # Enable versioning if the bucket is for Terraform backend
  versioning {
    enabled = var.terraform_backend ? true : false
  }

  # Enable default encryption (AES-256 or KMS) only for Terraform backend
  dynamic "server_side_encryption_configuration" {
    for_each = var.terraform_backend ? [1] : []
    content {
      rule {
        apply_server_side_encryption_by_default {
          sse_algorithm = var.encryption_algorithm
        }
      }
    }
  }

  # Optional access logging (regardless of terraform_backend)
  logging {
    target_bucket = var.logging_bucket
    target_prefix = var.logging_prefix
  }

  tags = var.tags
}

# Block all public access to the bucket
resource "aws_s3_bucket_public_access_block" "generic_bucket_access_block" {
  bucket = aws_s3_bucket.generic_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "bucket_name" {
  value = aws_s3_bucket.generic_bucket.bucket
}

output "bucket_arn" {
  value = aws_s3_bucket.generic_bucket.arn
}
