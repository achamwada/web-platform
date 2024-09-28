data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.lambda_source_path
  output_path = "${var.lambda_source_path}/${var.zip_name}.zip"
}

# Create the S3 bucket (if not already existing)
resource "aws_s3_bucket" "lambda_bucket" {
  bucket = var.lambda_bucket_name
}

# Upload the Lambda zip to the S3 bucket
resource "aws_s3_object" "lambda_zip" {
  bucket = aws_s3_bucket.lambda_bucket.bucket
  key    = "${var.zip_name}.zip"
  source = "${var.lambda_source_path}/${var.zip_name}.zip"
  acl    = "private"
}

# IAM role for Lambda
resource "aws_iam_role" "lambda_role" {
  name = "${var.lambda_name}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# Attach Lambda execution policy to the role
resource "aws_iam_role_policy_attachment" "lambda_execution_policy" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Create the Lambda function with the code stored in S3
resource "aws_lambda_function" "lambda" {
  function_name = var.lambda_name
  handler       = var.lambda_handler
  runtime       = var.lambda_runtime
  role          = aws_iam_role.lambda_role.arn

  # Instead of filename, use s3_bucket and s3_key
  s3_bucket     = aws_s3_bucket.lambda_bucket.bucket
  s3_key        = aws_s3_object.lambda_zip.key

  environment {
    variables = var.lambda_env_vars
  }
}

# Delete the zip file after upload to S3 using null_resource
resource "null_resource" "delete_local_zip" {
  provisioner "local-exec" {
    command = "rm -f ${data.archive_file.lambda_zip.output_path}"
  }

  # Ensure this runs after the S3 upload
  depends_on = [aws_s3_object.lambda_zip]
}