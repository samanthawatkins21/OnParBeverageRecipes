#!/bin/bash
set -euo pipefail

PROJECT_DIR="/Users/onparmarketing/Desktop/OnParBeverageRecipes-main"
export PATH="${PROJECT_DIR}/.tools/node/bin:/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin"

cd "${PROJECT_DIR}"
exec "${PROJECT_DIR}/.tools/node/bin/node" "${PROJECT_DIR}/node_modules/next/dist/bin/next" start -H 127.0.0.1 -p 3000
