# Base image setup with Node.js and Nginx
FROM node:20-alpine AS base
ENV PNPM_HOME="/var/lib/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install pnpm and nginx globally
RUN pnpm add -g pnpm && apk add --no-cache nginx

# Build the application
FROM base AS build
WORKDIR /app

# Copy package.json
COPY main/package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY main ./
COPY main/.env ./

# Build the application
RUN pnpm run build

# Run the application in production
FROM base AS runner
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/.env /app/.env

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose the port
EXPOSE 80

# Start Nginx and the application
CMD ["sh", "-c", "nginx -g 'daemon off;' & pnpm start"]