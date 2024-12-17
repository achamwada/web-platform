# Pull the base Node.js Alpine image from ECR
FROM 975050161127.dkr.ecr.eu-west-1.amazonaws.com/opti-web-app-base:latest

# Set working directory
WORKDIR /app

# Copy package.json and lock files
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the Next.js app port
EXPOSE 3000

# Start the Next.js app using Yarn
CMD ["yarn", "start"]
