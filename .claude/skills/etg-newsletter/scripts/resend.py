#!/usr/bin/env python3
"""Resend broadcast helper for the newsletter. Drafts only — it never sends.

    python3 resend.py check                       # key present + authenticates
    python3 resend.py create <email.html> "<Month YYYY>" "<Title>"
    python3 resend.py update-html <broadcast_id> <email.html>   # only while status=draft
    python3 resend.py show <broadcast_id>
    python3 resend.py audiences                   # names + contact COUNTS only, no addresses

Uses curl, not urllib: Cloudflare 403s urllib's user-agent (error 1010).
Key: ~/.config/resend/key (mode 600, no trailing newline).
"""
import json
import os
import subprocess
import sys
import tempfile

KEY_PATH = os.path.expanduser("~/.config/resend/key")
API = "https://api.resend.com"
TEST_AUDIENCE = "a77a77b8-19c7-4bec-929f-60ce2f17a33f"  # Test-Pernell
FROM = "ETG Crusaders <pernell@tnebasketball.com>"
REPLY_TO = ["woodardbb75@gmail.com"]  # Doug


def key():
    if not os.path.exists(KEY_PATH) or not os.path.getsize(KEY_PATH):
        sys.exit("No Resend key. Ask Pernell to copy it and run:\n"
                 "  mkdir -p ~/.config/resend && pbpaste | tr -d '\\n' > ~/.config/resend/key "
                 "&& chmod 600 ~/.config/resend/key")
    return open(KEY_PATH).read().strip()


def call(method, path, payload=None):
    cmd = ["curl", "-s", "-w", "\n%{http_code}", "-X", method, API + path,
           "-H", f"Authorization: Bearer {key()}", "-H", "Content-Type: application/json"]
    tmp = None
    if payload is not None:
        tmp = tempfile.NamedTemporaryFile("w", suffix=".json", delete=False, encoding="utf-8")
        json.dump(payload, tmp, ensure_ascii=False)
        tmp.close()
        cmd += ["--data-binary", "@" + tmp.name]
    out = subprocess.run(cmd, capture_output=True, text=True).stdout
    if tmp:
        os.unlink(tmp.name)
    body, _, code = out.rpartition("\n")
    if not code.startswith("2"):
        sys.exit(f"HTTP {code}: {body[:300]}")
    return json.loads(body) if body else {}


def summary(b):
    html = b.get("html") or ""
    for k in ("id", "name", "status", "audience_id", "from", "reply_to", "subject", "sent_at"):
        print(f"{k}: {b.get(k)}")
    print(f"html: {len(html):,} chars | unsubscribe token: {'RESEND_UNSUBSCRIBE_URL' in html}")


cmd, args = sys.argv[1], sys.argv[2:]
if cmd == "check":
    call("GET", "/audiences")
    print("key OK")
elif cmd == "create":
    html_path, month, title = args
    b = call("POST", "/broadcasts", {
        "name": f"Crusader Alumni Newsletter: {month}",
        "audience_id": TEST_AUDIENCE,
        "from": FROM,
        "reply_to": REPLY_TO,
        "subject": f"Crusaders Alumni Newsletter: {month} — {title}",
        "html": open(html_path, encoding="utf-8").read(),
    })
    summary(call("GET", f"/broadcasts/{b['id']}"))
elif cmd == "update-html":
    bid, html_path = args
    if call("GET", f"/broadcasts/{bid}").get("status") != "draft":
        sys.exit("Broadcast is not a draft — not touching it.")
    call("PATCH", f"/broadcasts/{bid}", {"html": open(html_path, encoding="utf-8").read()})
    summary(call("GET", f"/broadcasts/{bid}"))
elif cmd == "show":
    summary(call("GET", f"/broadcasts/{args[0]}"))
elif cmd == "audiences":
    for a in call("GET", "/audiences").get("data", []):
        rows = call("GET", f"/audiences/{a['id']}/contacts").get("data", [])
        print(f"{a['id']} | {a['name']} | {len(rows)} contacts")
else:
    sys.exit(__doc__)
