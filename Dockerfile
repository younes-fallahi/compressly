# Use latest LTS version of Node.js
FROM node:20-bookworm

# Set working directory inside the container
WORKDIR /app

RUN apt-get update && apt-get install -y ghostscript

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the entire project (except files in .dockerignore)
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript code
RUN npm run build

# Remove devDependencies to reduce image size
RUN npm prune --production

# Remove source code to keep the image clean
RUN rm -rf src

# Command to run the bot
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
