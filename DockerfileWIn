# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.16.0
FROM node:${NODE_VERSION}-alpine

# Install build tools for native modules
RUN apk add --no-cache python3 make g++

# Set working directory
WORKDIR /usr/src/app

# Copy package files first to leverage Docker caching
COPY package.json package-lock.json ./

# Install all dependencies (dev + prod) for build
ENV NODE_ENV=development
RUN npm install

# Copy all source files needed for build (backend + frontend)
COPY . .

# Run backend build (tsx) and frontend build (Vite)
RUN npm run build

# Switch to production mode and remove devDependencies
ENV NODE_ENV=production
RUN npm prune --production

# Use non-root user
USER node

# Expose app port
EXPOSE 5000

# Start the built app
CMD ["node", "dist/index.cjs"]
