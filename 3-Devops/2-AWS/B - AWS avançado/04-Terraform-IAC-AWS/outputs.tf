output "vpc_id" {
  value       = aws_vpc.main.id
  description = "The ID of the generated VPC"
}

output "subnet_id" {
  value       = aws_subnet.public.id
  description = "The ID of the public subnet"
}
