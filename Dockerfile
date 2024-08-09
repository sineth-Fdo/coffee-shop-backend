# Use the official Node.js 20 image as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's code into the working directory
COPY . .

# Rebuild bcrypt to match the Docker image architecture
RUN npm rebuild bcrypt --build-from-source

# Build your TypeScript application
RUN npm run build

# Your application listens on port 8080, so expose it
EXPOSE 8080

# Start the application
CMD ["node", "./dist/index.js"]
