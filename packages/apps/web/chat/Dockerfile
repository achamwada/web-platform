# Pull the base Node.js Alpine image from ECR
FROM 975050161127.dkr.ecr.eu-west-1.amazonaws.com/node-base:latest

# Set working directory
WORKDIR /app

# Copy necessary files for Yarn workspaces
COPY package.json yarn.lock ./

# Install dependencies using Yarn workspaces focus
RUN yarn install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN yarn build

# Expose the Next.js app port
EXPOSE 3000

# Start the Next.js app using Yarn
CMD ["yarn", "start"]
