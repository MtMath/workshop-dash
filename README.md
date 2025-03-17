# Docker Build and Run Instructions

This document provides instructions for building and running your React/TypeScript application using Docker.

## Prerequisites

- Docker installed on your machine
- Your application code with a proper `package.json` and build configuration

## Building the Docker Image

To build the Docker image, navigate to your project root (where the Dockerfile is located) and run:

```bash
docker build -t workshop-dashboard .
```

This command builds the Docker image with the tag `workshop-dashboard`.

## Running the Application

After the image is built, you can run it with:

```bash
docker run -p 3000:80 workshop-dashboard
```

This command:

- Runs a container from the `workshop-dashboard` image
- Maps port 3000 on your host to port 80 in the container
- You can now access your application at http://localhost:3000

## Nginx Configuration

The Dockerfile includes a basic Nginx configuration that:

- Serves your static files
- Handles SPA routing (redirects all routes to index.html)
- Applies compression and caching

If you need to customize this configuration, uncomment the line in the Dockerfile that copies the nginx.conf file and create this file in your project root.

## Environment Variables

If your application requires environment variables, you can:

1. Build them into the application at build time using `.env` files (for non-sensitive values)
2. Pass them at runtime using Docker:

```bash
docker run -p 3000:80 -e "API_URL=https://api.example.com" workshop-dashboard
```
