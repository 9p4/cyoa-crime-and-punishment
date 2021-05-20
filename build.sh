#!/bin/sh
set -ex
wasm-pack build --target web -d assets/pkg --no-typescript
