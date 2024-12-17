# Create an ECR repository for the Next.js app
resource "aws_ecr_repository" "opti_web_repo" {
  name                 = var.repo_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name = var.repo_name
  }
}

output "ecr_repo_url" {
  value = aws_ecr_repository.opti_web_repo.repository_url
}
