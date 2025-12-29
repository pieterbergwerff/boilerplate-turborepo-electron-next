#!/bin/bash

# Detect architecture and run appropriate app bundle
ARCH=$(uname -m)

if [ "$ARCH" = "arm64" ]; then
    echo "🍎 Running ARM64 (Apple Silicon) version..."
    open dist/mac-arm64/TurborepoElectronNext.app
elif [ "$ARCH" = "x86_64" ]; then
    echo "💻 Running x64 (Intel) version..."
    open dist/mac/TurborepoElectronNext.app
else
    echo "❓ Unknown architecture: $ARCH"
    echo "Available versions:"
    echo "  ARM64: dist/mac-arm64/TurborepoElectronNext.app"
    echo "  x64:   dist/mac/TurborepoElectronNext.app"
fi
