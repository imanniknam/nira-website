#!/usr/bin/env bash
# Back up everything the CMS stores (content, products, messages, uploaded images).
# Run on the server:  /opt/apps/nira/deploy/backup.sh   (keeps the last 14 archives)
set -euo pipefail
APP_DIR="${APP_DIR:-/opt/apps/nira}"
OUT="${OUT:-/opt/backups/nira}"
mkdir -p "$OUT"
tar -czf "$OUT/nira-data-$(date +%F-%H%M).tar.gz" -C "$APP_DIR" data
ls -1t "$OUT"/nira-data-*.tar.gz | tail -n +15 | xargs -r rm --
echo "backup written to $OUT"
