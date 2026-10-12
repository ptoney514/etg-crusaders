#!/usr/bin/env python3
"""Turn a newsletter photo into a web-ready JPEG with no metadata.

Input is either a JPEG/PNG file, or the JSON file the harness saves when the Drive
connector's download_file_content result is too large ({"content": <base64>, ...}).

    python3 -P process_photo.py <input> <output.jpg> [--max 1200] [--expect-bytes N]

Applies EXIF orientation, resizes the long edge to --max, saves JPEG q85 progressive
with ALL metadata dropped (phone photos carry GPS). Prints a summary. Run with -P, not -I:
-I hides the user-site PIL install.
"""
import argparse
import base64
import io
import json
import sys

from PIL import Image, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("dst")
ap.add_argument("--max", type=int, default=1200)
ap.add_argument("--expect-bytes", type=int, help="Drive fileSize; verifies the decode")
a = ap.parse_args()

raw = open(a.src, "rb").read()
if raw[:1] == b"{":
    raw = base64.b64decode(json.loads(raw)["content"])
if a.expect_bytes is not None and len(raw) != a.expect_bytes:
    sys.exit(f"decoded {len(raw)} bytes, expected {a.expect_bytes} — refusing")

src = Image.open(io.BytesIO(raw))
had_gps = bool(src.getexif().get_ifd(0x8825))
im = ImageOps.exif_transpose(src).convert("RGB")
im.thumbnail((a.max, a.max), Image.LANCZOS)
im.save(a.dst, "JPEG", quality=85, optimize=True, progressive=True)

out = Image.open(a.dst)
assert len(out.getexif()) == 0, "metadata survived"
print(f"in {src.size} {len(raw):,} B (GPS: {had_gps}) -> out {out.size} "
      f"{len(open(a.dst, 'rb').read()):,} B, 0 EXIF tags")
