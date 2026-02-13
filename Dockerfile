# ------------------
# Build stage
# ------------------
FROM node:22.16.0-alpine AS builder

WORKDIR /usr/src/app
RUN apk add --no-cache python3 make g++

# Copy package files first
COPY package*.json ./

# Install all dependencies including devDependencies for building
RUN npm install

# Copy all source code
COPY . .

# Run build (backend + frontend)
RUN npm run build

# ------------------
# Production stage
# ------------------
FROM node:22.16.0-alpine

WORKDIR /usr/src/app

# Copy built dist folder
COPY --from=builder /usr/src/app/dist ./dist

# Copy package.json & package-lock.json
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Use non-root user
USER node

# Expose port (Cloud Run uses PORT env variable)
EXPOSE 5000

# Environment
ENV NODE_ENV=production
ENV DBURISECRETNAME=MONGODB_URI

# Start app
CMD ["node", "dist/index.cjs"]
