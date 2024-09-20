variable "cluster_name" {
  description = "Name of the ECS cluster"
}

variable "family" {
  description = "ECS Task family"
}

variable "cpu" {
  description = "The amount of CPU for the task"
  default     = "256"
}

variable "memory" {
  description = "The amount of memory for the task"
  default     = "512"
}

variable "container_name" {
  description = "The name of the container"
}

variable "image" {
  description = "The Docker image to run for the Next.js application"
}

variable "container_port" {
  description = "The port on which the container will listen"
  default     = 3000
}

variable "host_port" {
  description = "The port on which the host will listen"
  default     = 3000
}

variable "execution_role_arn" {
  description = "The ECS task execution role ARN"
}

variable "task_role_arn" {
  description = "The ECS task role ARN"
}

variable "service_name" {
  description = "The name of the ECS service"
}

variable "desired_count" {
  description = "The number of tasks to run"
  default     = 1
}

variable "subnet_ids" {
  description = "List of subnets for the ECS tasks"
}

variable "security_group_ids" {
  description = "List of security groups for the ECS tasks"
}

variable "alb_target_group_arn" {
  description = "The ALB target group ARN to attach to the ECS service"
}
