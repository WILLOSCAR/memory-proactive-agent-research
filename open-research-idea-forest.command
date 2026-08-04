#!/bin/zsh
set -euo pipefail

ROOT="/Users/bytedance/Documents/research-idea-forest-site"
URL="http://127.0.0.1:8766/"
LOG_FILE="${TMPDIR:-/tmp}/research-idea-forest-site.log"
PID_FILE="${TMPDIR:-/tmp}/research-idea-forest-site.pid"
NPM_BIN="/opt/homebrew/bin/npm"

if [[ ! -x "$NPM_BIN" ]]; then
  NPM_BIN="$(command -v npm)"
fi

is_ready() {
  /usr/bin/curl -fsS --max-time 1 "$URL" 2>/dev/null | /usr/bin/grep -q "Auto Research OS"
}

if ! is_ready; then
  cd "$ROOT"
  /usr/bin/nohup "$NPM_BIN" run dev -- --hostname 127.0.0.1 --port 8766 \
    >"$LOG_FILE" 2>&1 &
  print -r -- "$!" >"$PID_FILE"

  for _ in {1..30}; do
    if is_ready; then
      break
    fi
    /bin/sleep 0.1
  done
fi

if ! is_ready; then
  print -u2 "本地预览启动失败，日志：$LOG_FILE"
  exit 1
fi

/usr/bin/open "$URL"
