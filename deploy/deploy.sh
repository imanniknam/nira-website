#!/usr/bin/env bash
# Deploy نیرا to the VPS: sync the source, (first run) create .env, build and restart.
#   ./deploy/deploy.sh                       # uses the defaults below
#   HOST=root@1.2.3.4 SITE_URL=https://nira.example.com ./deploy/deploy.sh
set -euo pipefail

HOST="${HOST:-root@85.198.54.86}"
APP_DIR="${APP_DIR:-/opt/apps/nira}"
SITE_URL="${SITE_URL:-}"

cd "$(dirname "$0")/.."

echo "▶ Syncing source to $HOST:$APP_DIR"
ssh "$HOST" "mkdir -p '$APP_DIR'"
rsync -az --delete \
  --exclude node_modules --exclude .next --exclude .git --exclude .claude \
  --exclude data --exclude .env --exclude legacy --exclude _old-static --exclude pics --exclude 'نیرا' --exclude docs \
  --exclude '*.tsbuildinfo' --exclude .DS_Store --exclude contact_tmp.html \
  ./ "$HOST:$APP_DIR/"

echo "▶ Preparing server"
ssh "$HOST" "bash -s" <<REMOTE
set -euo pipefail
cd '$APP_DIR'
mkdir -p data
chown -R 1000:1000 data   # the container runs as the unprivileged 'node' user
if [ ! -f .env ]; then
  PASS=\$(openssl rand -base64 18 | tr -d '/+=' | cut -c1-20)
  cp .env.example .env
  sed -i "s|^ADMIN_PASSWORD=.*|ADMIN_PASSWORD=\$PASS|" .env
  [ -n '$SITE_URL' ] && sed -i "s|^SITE_URL=.*|SITE_URL=$SITE_URL|" .env
  chmod 600 .env
  echo "────────────────────────────────────────────"
  echo " First run — admin login created:"
  echo "   username: admin"
  echo "   password: \$PASS"
  echo " (also stored in $APP_DIR/.env; change it in the panel)"
  echo "────────────────────────────────────────────"
fi
docker compose up -d --build
docker image prune -f >/dev/null
sleep 6
docker compose ps
curl -fsS http://127.0.0.1:\${NIRA_PORT:-3500}/api/health && echo " ← health ok"
REMOTE

echo "✔ Deployed. Local port on the server: 3500 (add the domain in /opt/edge/Caddyfile — see deploy/Caddyfile.snippet)"
