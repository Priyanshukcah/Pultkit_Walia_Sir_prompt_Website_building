#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/pulkitwalia/Downloads/Cursor Training Be10X/Training"
DIST="$ROOT/dist"
P2="$ROOT/Part 2"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

mkdir -p "$DIST"
COMBINED="$DIST/combined.md"

{
  cat "$P2/mega-prompt.md"
  echo ""; echo ""
  cat "$P2/prompts.md"
  echo ""; echo ""
  cat "$P2/training-guide.md"
} > "$COMBINED"

echo "[1/4] Combined markdown ($(wc -l < "$COMBINED") lines)"

HTML="$DIST/Part2-Combined.html"
pandoc "$COMBINED" \
  --from=gfm+raw_html --to=html5 --standalone \
  --toc --toc-depth=2 \
  --highlight-style=breezedark \
  --include-before-body="$DIST/cover.html" \
  --css="style.css" \
  -o "$HTML"
echo "[2/4] HTML → $HTML"

DOCX="$DIST/Part2-Combined.docx"
pandoc "$COMBINED" \
  --from=gfm+raw_html --to=docx \
  --toc --toc-depth=2 \
  --highlight-style=tango \
  --metadata title="Be10X · Part 2 · Combined Handbook" \
  -o "$DOCX"
echo "[3/4] DOCX → $DOCX"

PDF="$DIST/Part2-Combined.pdf"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PDF" --print-to-pdf-no-header \
  --virtual-time-budget=10000 --no-sandbox \
  "file://$HTML" >/dev/null 2>&1
echo "[4/4] PDF → $PDF"

ls -lh "$DIST"/Part2-Combined.* | awk '{print "  "$0}'
