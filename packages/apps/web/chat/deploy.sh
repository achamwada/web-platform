#!/bin/bash

# Make sure AWS credentials are set in the environment
if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
    echo "AWS credentials are not set. Please set them in your environment variables."
    exit 1
fi

# Login to ECR
echo "Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build the Next.js Docker image
echo "Building Docker image..."
docker build -t travel-web-chat:latest .

# Tag the Docker image for ECR
docker tag travel-web-chat:latest $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/travel-web-chat:latest

# Push the Docker image to ECR
echo "Pushing Docker image to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/travel-web-chat:latest

# Initialize and apply Terraform to deploy infrastructure
echo "Deploying infrastructure with Terraform..."
cd ../../../infrastructure
terraform init
terraform plan -out=tfplan
terraform apply tfplan
cd -
