# Stage 1: Build the application
FROM node:20-alpine AS build
WORKDIR /app
COPY main/package.json ./
RUN npm install
COPY main ./
COPY main/.env ./
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3030

CMD ["npm", "start"]