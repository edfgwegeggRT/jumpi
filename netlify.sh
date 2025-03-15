#!/bin/bash

echo "Starting Netlify deployment build script"

# Navigate to client directory
cd client

# Install dependencies
npm install

# Build for production
npm run build

echo "Build completed successfully"