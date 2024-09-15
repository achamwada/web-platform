# Create the Network Load Balancer
resource "aws_lb" "nlb" {
  name               = var.name
  internal           = false
  load_balancer_type = "network"
  subnets            = var.subnet_ids

  enable_deletion_protection = false

  tags = {
    Name = var.name
  }
}

# Create a target group for NLB to route traffic to ECS tasks
resource "aws_lb_target_group" "nlb_tg" {
  name     = "${var.name}-tg"
  port     = 80
  protocol = "TCP"
  vpc_id   = var.vpc_id

  health_check {
    protocol            = "TCP"
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 10
    interval            = 30
  }
}

# Create an NLB Listener for TCP traffic
resource "aws_lb_listener" "tcp" {
  load_balancer_arn = aws_lb.nlb.arn
  port              = "80"
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.nlb_tg.arn
  }
}

output "nlb_dns_name" {
  value = aws_lb.nlb.dns_name
}
