output "bucket_name" {
  value = aws_s3_bucket.generic_bucket.bucket
}

output "bucket_arn" {
  value = aws_s3_bucket.generic_bucket.arn
}