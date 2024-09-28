terraform {
  backend "s3" {
    bucket = "tripvoya-web-platform"
    region = "eu-west-1"
    encrypt = true
  }
}

/*module "vpc" {
  source               = "./modules/vpc"
  cidr_block           = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnet_cidrs = ["10.0.3.0/24", "10.0.4.0/24"]
}

module "alb" {
  source            = "./modules/alb"
  name              = "tripvoya-web-platform-alb"
  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.public_subnet_ids
  security_group_id = module.security_groups.alb_sg_id
}

module "nlb" {
  source     = "./modules/nlb"
  name       = "tripvoya-web-platform-nlb"
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.public_subnet_ids
}

module "ecr" {
  source    = "./modules/ecr"
  repo_name = "tripvoya-web-platform"
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

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}


module "ecs_fargate" {
  source               = "./modules/ecs_fargate"
  cluster_name         = "tripvoya-web-platform-cluster"
  family               = "tripvoya-web-platform"
  container_name       = "tripvoya-web-platform-container"
  image                = "travel-web-chat:latest"
  cpu                  = "256"
  memory               = "512"
  container_port       = 3000
  host_port            = 3000
  execution_role_arn   = aws_iam_role.execution_role.arn
  task_role_arn        = aws_iam_role.task_role.arn
  service_name         = "tripvoya-web-platform-service"
  desired_count        = 1
  subnet_ids           = module.vpc.public_subnet_ids
  security_group_ids   = [aws_security_group.ecs_sg.id]
  alb_target_group_arn = aws_lb_target_group.alb_tg.arn

}

module "security_groups" {
  source        = "./modules/security_groups"
  vpc_id        = module.vpc.vpc_id
  ecs_task_port = 3000
}*/


module "lambda" {
  source              = "./modules/lambda"
  lambda_name         = "talkbot-lambda"
  lambda_handler      = "talkbot-lambda/index.handler"
  lambda_runtime      = "nodejs18.x"
  lambda_source_path  = "${path.root}/../apps/lambdas/TalkBot/out/dist/TalkBot"

  lambda_env_vars     = var.lambda_env_vars
}

module "api" {
  source          = "./modules/api_gateway"
  api_name        = "tripvoya-web-platform-api"
  api_description = "API Gateway for web platform"
  environment = var.environment
  
}


resource "aws_api_gateway_resource" "content_service" {
  rest_api_id = module.api.api_gateway_id
  parent_id   = module.api.root_resource_id
  path_part   = "content-service"

}

resource "aws_api_gateway_resource" "v2" {
  rest_api_id = module.api.api_gateway_id
  parent_id   = aws_api_gateway_resource.content_service.id
  path_part   = "v2"

}

resource "aws_api_gateway_request_validator" "get-method" {
  name                        = "QueryRequestValidator"
  rest_api_id                 = module.api.api_gateway_id
  validate_request_parameters = true
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id = module.api.api_gateway_id
  resource_id = aws_api_gateway_resource.v2.id
  http_method = "GET"
  api_key_required = false

  authorization = "NONE"

  request_parameters = {
    "method.request.querystring.contentEntryKey" = true
    "method.request.querystring.contentTypeId"     = true
  }

  request_validator_id = aws_api_gateway_request_validator.get-method.id
}

resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = module.api.api_gateway_id
  resource_id             = aws_api_gateway_resource.v2.id
  http_method             = aws_api_gateway_method.proxy.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = module.lambda.lambda_function_invoke_arn

  passthrough_behavior = "WHEN_NO_TEMPLATES"
  request_templates = {
    "application/json" = file("./utils/get-method-integration-request.vtl")
  }

}

resource "aws_api_gateway_method_response" "proxy" {
  rest_api_id = module.api.api_gateway_id
  resource_id = aws_api_gateway_resource.v2.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = "200"

}

resource "aws_api_gateway_integration_response" "proxy" {
  rest_api_id = module.api.api_gateway_id
  resource_id = aws_api_gateway_resource.v2.id
  http_method = aws_api_gateway_method.proxy.http_method
  status_code = aws_api_gateway_method_response.proxy.status_code



  depends_on = [
    aws_api_gateway_method.proxy,
    aws_api_gateway_integration.lambda_integration
  ]
}

resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    aws_api_gateway_integration.lambda_integration,
  ]

  rest_api_id = module.api.api_gateway_id
  stage_name  = var.environment

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.content_service,
      aws_api_gateway_resource.v2,
      aws_api_gateway_integration.lambda_integration,
      aws_api_gateway_method.proxy
      ]
    ))
  }

  lifecycle {
    create_before_destroy = true
  }
}


module "method-models" {
  source      = "./modules/api-gateway-response-schemas"
  rest-api-id = module.api.api_gateway_id
  resource_id = aws_api_gateway_resource.v2.id
  http_method = aws_api_gateway_method.proxy.http_method

  integration = aws_api_gateway_integration.lambda_integration


}