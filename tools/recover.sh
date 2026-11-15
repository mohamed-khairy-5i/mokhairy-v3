#!/usr/bin/env bash
# tools/recover.sh — full sandbox recovery for the MK portfolio preview (rollback-proof, lives in-repo).
# Usage: bash tools/recover.sh            (from anywhere; paths are absolute)
set -uo pipefail

REPO=/home/z/my-project/mokhairy-v3-clone
OUT="$REPO/out"
DAEMON=/home/z/my-project/scripts/daemon-serve.py
WATCHDOG=/home/z/my-project/scripts/port-watchdog.py
ZIP=/home/z/my-project/download/mohamed-khairy-portfolio-v4.zip

echo "== 1) sync clone to origin/main =="
cd "$REPO"
git fetch origin
git reset --hard origin/main
git log --oneline -1

echo "== 2) deps =="
if [ ! -d node_modules ] || [ -z "$(ls node_modules 2>/dev/null | head -1)" ]; then
  npm ci --silent
fi

echo "== 3) build static export =="
npm run build
echo "html pages: $(rg --files out -g '*.html' | wc -l)"

echo "== 4) daemon docroot =="
sed -i "s|^DOCROOT = .*|DOCROOT = \"$OUT\"|" "$DAEMON"

echo "== 5) token residue cleanup =="
sed -i 's/ghp_[A-Za-z0-9]\{20,\}/REDACTED/g' /home/z/my-project/scripts/update_npm_secret.py 2>/dev/null
if [ -d /home/z/my-project/mokhairy-backup-clone/.git ]; then
  (cd /home/z/my-project/mokhairy-backup-clone && \
   git remote set-url origin https://github.com/mohamed-khairy-5i/mokhairy-portfolio-backup.git 2>/dev/null)
fi

echo "== 6) restart daemon + watchdog =="
HOLD=$(ss -tlnp 2>/dev/null | grep ':3000' | grep -o 'pid=[0-9]*' | head -1 | cut -d= -f2)
[ -n "$HOLD" ] && kill -9 "$HOLD" 2>/dev/null
pkill -f port-watchdog 2>/dev/null
sleep 1
nohup python3 "$DAEMON" >/dev/null 2>&1 &
sleep 2
nohup python3 "$WATCHDOG" >/dev/null 2>&1 &
sleep 3

echo "== 7) verify =="
T1=$(curl -s -m 5 localhost:3000/ | grep -o '<title>[^<]*</title>' | head -1)
T2=$(curl -s -m 5 localhost:3000/projects/ | grep -o '<title>[^<]*</title>' | head -1)
echo "home:   $T1"
echo "projects: $T2"
case "$T1$T2" in *Mohamed\ Khairy*) echo "SERVICE OK"; ;; *) echo "SERVICE FAILED"; exit 1; ;; esac

echo "== 8) repackage zip =="
STAGE=/tmp/mk-zip-stage
rm -rf "$STAGE" "$ZIP"
mkdir -p "$STAGE/source" "$STAGE/static-site"
(cd "$REPO" && tar cf - --exclude=.git --exclude=node_modules --exclude=out --exclude=.next --exclude=.DS_Store .) | (cd "$STAGE/source" && tar xf -)
cp -r "$OUT" "$STAGE/static-site"
cat > "$STAGE/READ-ME-FIRST-AR.txt" <<'EOF'
================================================================
  بورتفوليو محمد خيري — الإصدار الرابع (59 صفحة، EN/AR + RTL)
  تصميم MK TECH Monochrome — أسود #0a0a0a + لمسات بيضاء
================================================================

الملف ده فيه نسختين جاهزتين:

1) static-site/
   الموقع الجاهز كملفات ثابتة (HTML/CSS/JS).
   ترفعه على أي استضافة ثابتة زي ما هو وينشر فوراً
   (Cloudflare Pages Direct Upload / Netlify Drop / GitHub Pages / أي سيرفر).

2) source/
   سورس مشروع Next.js كامل — لو عايز تعدّل وتعيد البناء:
     npm install
     npm run build
   هيطلع لك مجلد out جاهز للنشر.

------------------------------------------------------------
النشر على Cloudflare Pages (من السورس):
------------------------------------------------------------
  - Build preset:              None
  - Build command:             npx next build
  - Build output directory:    out
  - Environment variable:
        NODE_VERSION = 22

ملاحظات:
  - الموقع export ثابت بالكامل (output: "export") — مفيش سيرفر مطلوب.
  - عربي/إنجليزي + RTL كامل — التبديل من زر اللغة في الناف بار.
  - مشاريع الكلية ليها فلتر خاص في صفحة Projects هيظهر تلقائياً أول ما تتضاف.
  - الصور والخطوط محلية — مفيش تبعية خارجية.
EOF
(cd "$STAGE" && zip -qr "$ZIP" .)
echo "zip: $(ls -la "$ZIP" | awk '{print $5" bytes"}')"

echo "== RECOVERY COMPLETE =="
