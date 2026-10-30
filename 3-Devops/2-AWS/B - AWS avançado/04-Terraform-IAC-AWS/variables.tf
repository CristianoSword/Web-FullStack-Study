variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "The AWS target deployment region"
}

variable "environment" {
  type        = string
  default     = "staging"
  description = "Application deployment environment"
}
