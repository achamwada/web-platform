variable "api_name" {
  description = "The name of the API Gateway"
}

variable "api_description" {
  description = "The description of the API Gateway"
}

variable "environment" {
  type = string
}

variable "segment" {
  type = string
  default = "digital"
}
# variable "path" {
#   description = "The path part of the API"
# }

# variable "http_method" {
#   description = "The HTTP method (e.g., GET, POST)"
# }

# variable "request_parameters" {
#   description = "Query parameters for the API Gateway method"
#   type        = map(bool)
# }
