# ------------------
# Build stage
# ------------------
FROM node:22.16.0-alpine AS builder

WORKDIR /usr/src/app
RUN apk add --no-cache python3 make g++

# Copy package files first
COPY package*.json ./

# Install all dependencies (including devDependencies!)
RUN npm install

# Copy all source code
COPY . .

# Run build
RUN npm run build

# ------------------
# Production stage
# ------------------
FROM node:22.16.0-alpine

WORKDIR /usr/src/app

# Copy built dist folder
COPY --from=builder /usr/src/app/dist ./dist

# Copy only production dependencies
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --omit=dev

# Use non-root user
USER node

# Expose port
EXPOSE 5000

ENV NODE_ENV=production
ENV DBURISECRETNAME=MONGODB_URI

# Correct entry point
CMD ["node", "dist/index.cjs"]
