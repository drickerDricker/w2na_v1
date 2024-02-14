#!/usr/bin/env bash

set -euo pipefail
export LC_ALL=C

# 実行スクリプト上のディレクトリを取得
script_dir="$(
  cd "$(dirname "$0")"
  pwd
)"

aws dynamodb create-table --table-name SynthVoiceRequests \
--attribute-definitions AttributeName=ulID,AttributeType=S AttributeName=status,AttributeType=S \
--key-schema AttributeName=ulID,KeyType=HASH AttributeName=status,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
--endpoint-url http://localhost:8000
