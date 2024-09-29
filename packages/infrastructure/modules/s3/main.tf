resource "aws_s3_bucket" "generic_bucket" {
  bucket = var.bucket_name

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

# Separate resource for versioning
resource "aws_s3_bucket_versioning" "generic_bucket_versioning" {
  bucket = aws_s3_bucket.generic_bucket.bucket

  versioning_configuration {
    status = var.terraform_backend ? "Enabled" : "Suspended"
  }
}

# Separate resource for server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "generic_bucket_encryption" {
  count  = var.terraform_backend ? 1 : 0
  bucket = aws_s3_bucket.generic_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = var.encryption_algorithm
    }
  }
}

resource "aws_s3_bucket" "logging_bucket" {
  count  = var.create_logging_bucket ? 1 : 0
  bucket = var.logging_bucket
}


# Separate resource for logging configuration
resource "aws_s3_bucket_logging" "generic_bucket_logging" {
  bucket        = aws_s3_bucket.generic_bucket.id
  target_bucket = var.logging_bucket
  target_prefix = var.logging_prefix
}

