# Use official Node.js image as the base image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /src

# Copy the package.json and package-lock.json to install dependencies first for caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite React app
RUN npm run build

# Install PM2 globally for managing the app
RUN npm install -g pm2

# Expose the port that the Vite app will run on
EXPOSE 5173

# Start the app using PM2 in production mode
CMD ["pm2-runtime", "npm", "--", "start"]
