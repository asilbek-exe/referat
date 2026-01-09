#!/bin/bash
# Script to preview GitHub Pages build locally

cd "$(dirname "$0")/.."

echo "Building with GitHub Pages settings..."
VITE_BASE_PATH=/referat/ VITE_USE_HASH_ROUTER=true npm run build

echo ""
echo "Starting preview server..."
echo "Access your app at: http://localhost:4173/referat/#/login"
echo ""

vite preview --base /referat/ --port 4173

