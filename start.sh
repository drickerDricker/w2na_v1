set -euo pipefail
export LC_ALL=C

# 実行スクリプト上のディレクトリを取得
script_dir="$(
  cd "$(dirname "$0")"
  pwd
)"

cd ${script_dir}/backend
sam build
sam local start-api -p 3001 --docker-network w2na_v1_w2na_networks
