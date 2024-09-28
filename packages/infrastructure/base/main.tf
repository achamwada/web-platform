module "dynamodb_terraform_locks" {
  source = "../modules/dynamodb"

  table_name    = "${var.environment}-terraform-locks"
  hash_key      = "LockID"
  hash_key_type = "S"
  billing_mode  = "PAY_PER_REQUEST"
  tags = {
    "Environment" = var.environment
    "Project"     = "tripvoya-web-platform-infrastructure"
  }
}


module "s3_backend_bucket" {
  source = "../modules/s3"

  bucket_name          = "tripvoya-web-platform"
  create_logging_bucket = true
  logging_bucket       = "tripvoya-web-platform-logging"
  terraform_backend    = true
  encryption_algorithm = "AES256"
  tags = {
    "Environment" = var.environment
    "Project"     = "tripvoya-web-platform-infrastructure"
  }
}


module "base_image_repo" {
  source    = "../modules/ecr"
  repo_name = "node-base"
}

module "travel_web_chat_repo" {
  source    = "../modules/ecr"
  repo_name = "travel-web-chat"
}