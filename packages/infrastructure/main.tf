terraform {
  backend "s3" {
    bucket  = "tripvoya-web-platform"
    region  = "eu-west-1"
    encrypt = true
  }
}

/*module "vpc" {
  source               = "./modules/vpc"
  cidr_block           = var.vpc_cidr_block
  public_subnet_cidrs  = var.vpc_public_subnet_cidrs
  private_subnet_cidrs = var.vpc_private_subnet_cidrs
}

module "alb" {
  source            = "./modules/alb"
  name              = "${var.app_name}-alb"
  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.public_subnet_ids
  security_group_id = module.security_groups.alb_sg_id
}

module "ecr" {
  source    = "./modules/ecr"
  repo_name = var.app_name
}

resource "aws_iam_role" "execution_role" {
  name = "ecs_execution_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "ecs.amazonaws.com"
      }
    }]
  })

  managed_policy_arns = [
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  ]
}

resource "aws_iam_role" "task_role" {
  name = "ecs_task_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "ecs-tasks.amazonaws.com"
      }
    }]
  })
}

resource "aws_security_group" "ecs_sg" {
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ecs_sg"
  }
}

resource "aws_lb_target_group" "alb_tg" {
  name     = "alb-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  target_type = "ip"
  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = module.alb.alb_arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.alb_tg.arn
  }
}

module "ecs_fargate" {
  source               = "./modules/ecs_fargate"
  cluster_name         = "${var.app_name}-cluster"
  family               = var.app_name
  container_name       = "${var.app_name}-container"
  image                = "travel-web-chat:latest"
  execution_role_arn   = aws_iam_role.execution_role.arn
  task_role_arn        = aws_iam_role.task_role.arn
  service_name         = "${var.app_name}-service"
  desired_count        = 1
  subnet_ids           = module.vpc.public_subnet_ids
  security_group_ids   = [aws_security_group.ecs_sg.id]
  alb_target_group_arn = aws_lb_target_group.alb_tg.arn
  vpc_id               = module.vpc.vpc_id
}

module "security_groups" {
  source        = "./modules/security_groups"
  vpc_id        = module.vpc.vpc_id
  ecs_task_port = 3000
}*/

module "api" {
  source          = "./modules/api_gateway"
  api_name        = "${var.app_name}-api"
  api_description = "API Gateway for web platform"
  environment     = var.environment
  segment         = var.segment
}

module "content_service" {
  source      = "./modules/content-service"
  environment = var.environment
  execution_arn = module.api.execution_arn

  api_gateway_id               = module.api.api_gateway_id
  api_gateway_root_resource_id = module.api.root_resource_id
  segment                      = var.segment

  lambda_env_vars = var.lambda_env_vars
}

/*output "alb_dns_name" {
  value = module.alb.alb_dns_name
}*/
