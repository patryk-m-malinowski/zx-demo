#!/bin/bash

INSPECT=${1:-"--inspect"}
ARGS=${2:-"serve"}
nodemon $INSPECT --exitcrash \
  --watch ./compiled/source-node/server-app \
  ./compiled/source-node/server-app/index.js $ARGS # || ./serve.sh "$@"

