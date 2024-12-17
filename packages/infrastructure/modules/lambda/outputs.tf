output "lambda_function_arn" {
  description = "The ARN of the Lambda function arn"
  value       = aws_lambda_function.lambda.arn
}


output "lambda_function_invoke_arn" {
  description = "The ARN of the Lambda function invoke_arn"
  value       = aws_lambda_function.lambda.invoke_arn
}

output "lambda_function_name" {
  description = "The ARN of the Lambda function function_name"
  value       = aws_lambda_function.lambda.function_name
}