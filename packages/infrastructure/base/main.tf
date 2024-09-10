module "dynamodb_terraform_locks" {
  source     = "../modules/dynamodb"

  table_name     = "terraform-locks"
  hash_key       = "LockID"
  hash_key_type  = "S"
  billing_mode   = "PAY_PER_REQUEST"  # Use provisioned if you want to specify capacity
  tags = {
    "Environment" = "dev"
    "Project"     = "opti-web-app-infrastructure"
  }
}


module "s3_backend_bucket" {
  source = "../modules/s3"

  bucket_name        = "opti-web-app"
  terraform_backend  = true
  encryption_algorithm = "AES256"
  tags = {
    "Environment" = "dev"
    "Project"     = "opti-web-app-infrastructure"
  }
}


module "ecr" {
  source   = "../modules/ecr"
  repo_name = "opti-web-app-base"
}