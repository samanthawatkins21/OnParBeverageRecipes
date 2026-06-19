#!/bin/bash
set -euo pipefail

PROJECT_DIR="/Users/onparmarketing/Desktop/OnParBeverageRecipes-main"

echo "On Par Beverage Recipes - Mac tool setup"
echo "Project: ${PROJECT_DIR}"
echo

if ! command -v brew >/dev/null 2>&1; then
  echo "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "Homebrew already installed."
fi

if [ -x /opt/homebrew/bin/brew ]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
elif [ -x /usr/local/bin/brew ]; then
  eval "$(/usr/local/bin/brew shellenv)"
fi

echo
echo "Installing required tools..."
brew update
brew install node python git cloudflared

echo
echo "Tool versions:"
node --version
npm --version
python3 --version
git --version
cloudflared --version

echo
echo "Installing project dependencies..."
cd "${PROJECT_DIR}"
npm install

echo
echo "Running build check..."
npm run build

echo
echo "Done. You can start the app with:"
echo "  cd \"${PROJECT_DIR}\""
echo "  npm run dev"
echo
echo "For Cloudflare, keep your tunnel token/credentials handy before installing the always-on tunnel service."
read -n 1 -s -r -p "Press any key to close this window..."
