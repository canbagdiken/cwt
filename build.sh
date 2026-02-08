#!/bin/bash

# CWT Build Script
# Creates a release package for Chrome Web Store

set -e

VERSION="1.0.0"
BUILD_DIR="build"
PACKAGE_NAME="cwt-${VERSION}.zip"

echo "🚀 Building CWT v${VERSION}..."

# Clean previous build
if [ -d "$BUILD_DIR" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf "$BUILD_DIR"
fi

# Create build directory
mkdir -p "$BUILD_DIR"

# Copy extension files
echo "📦 Copying extension files..."
cp manifest.json "$BUILD_DIR/"
cp background.js "$BUILD_DIR/"
cp content.js "$BUILD_DIR/"
cp popup.html "$BUILD_DIR/"
cp popup.js "$BUILD_DIR/"
cp -r icons "$BUILD_DIR/"

# Copy documentation
echo "📄 Copying documentation..."
cp README.md "$BUILD_DIR/"
cp LICENSE "$BUILD_DIR/"
cp PRIVACY.md "$BUILD_DIR/"

# Validate manifest
echo "✅ Validating manifest.json..."
if ! python3 -m json.tool "$BUILD_DIR/manifest.json" > /dev/null; then
    echo "❌ Invalid manifest.json"
    exit 1
fi

# Validate JavaScript
echo "✅ Validating JavaScript files..."
if command -v node &> /dev/null; then
    node -c "$BUILD_DIR/content.js"
    node -c "$BUILD_DIR/popup.js"
    node -c "$BUILD_DIR/background.js"
    echo "✓ JavaScript validation passed"
else
    echo "⚠️  Node.js not found, skipping JS validation"
fi

# Create ZIP package
echo "📦 Creating release package..."
cd "$BUILD_DIR"
zip -r "../${PACKAGE_NAME}" ./* > /dev/null
cd ..

# Calculate package size
SIZE=$(du -h "$PACKAGE_NAME" | cut -f1)
echo "✅ Build complete!"
echo "📦 Package: $PACKAGE_NAME"
echo "💾 Size: $SIZE"
echo ""
echo "To install:"
echo "1. Go to chrome://extensions/"
echo "2. Enable Developer Mode"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'build' directory"
echo ""
echo "To submit to Chrome Web Store:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Upload $PACKAGE_NAME"
echo "3. Fill in store listing details"
echo "4. Submit for review"
