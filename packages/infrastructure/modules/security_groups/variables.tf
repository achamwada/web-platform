variable "vpc_id" {
  description = "The VPC ID where the security groups will be created"
}

variable "ecs_task_port" {
  description = "The port on which the ECS tasks will listen"
  default     = 3000
}
