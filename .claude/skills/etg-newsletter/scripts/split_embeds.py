#!/usr/bin/env python3
"""Split an issue's resend-email.html into Webflow Code Embed parts.

    python3 split_embeds.py docs/newsletter-embeds/<mon-yyyy>/

Each top-level <table align=...> in <body> becomes embed-part-N.html. Email-only bits are
removed: the preheader div, the unsubscribe link, and the "You're receiving this" line.
Fails if any part is over Webflow's ~10 KB embed limit (then split that section's outer
table in the email itself into two outer tables, never at a <tr>).
"""
import re
import sys
from pathlib import Path

LIMIT = 10_000
d = Path(sys.argv[1])
html = (d / "resend-email.html").read_text(encoding="utf-8")
body = html.split("<body", 1)[1].split(">", 1)[1].rsplit("</body>", 1)[0]
body = re.sub(r"<!-- PREHEADER.*?</div>\s*", "", body, flags=re.S)

parts = ["<table align" + p for p in body.split("<table align")[1:]]
for old in d.glob("embed-part-*.html"):
    old.unlink()

bad = False
for i, t in enumerate(parts, 1):
    t = re.sub(r"\s*<p[^>]*>You're receiving this[^<]*</p>", "", t)
    t = re.sub(r"\s*&nbsp;•&nbsp;\s*<a href=\"\{\{\{RESEND_UNSUBSCRIBE_URL\}\}\}\"[^>]*>Unsubscribe</a>", "", t)
    t = t.strip() + "\n"
    assert "RESEND_UNSUBSCRIBE_URL" not in t, f"part {i}: unsubscribe token left"
    size = len(t.encode())
    bad |= size > LIMIT
    (d / f"embed-part-{i}.html").write_text(t, encoding="utf-8")
    print(f"embed-part-{i}.html  {size:,} B{'  OVER LIMIT' if size > LIMIT else ''}")
sys.exit(1 if bad else 0)
