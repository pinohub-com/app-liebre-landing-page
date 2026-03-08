#!/usr/bin/env python3
"""
Descarga imágenes del JSON usando threads paralelos.
Uso: python content/download_images.py [--output carpeta] [--workers N]
"""

import argparse
import json
import re
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    print("pip install requests")
    sys.exit(1)
try:
    import pypeln as pl
except ImportError:
    print("pip install pypeln")
    sys.exit(1)

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}


def filename(url: str, i: int) -> str:
    m = re.search(r"/(\d+)_(\d+)_", url)
    return f"{i:05d}_{m.group(1)}_{m.group(2)}.jpg" if m else f"image_{i:05d}.jpg"


def download(item, output_dir: Path, skip: bool) -> str:
    i, url = item
    path = output_dir / filename(url, i)
    if skip and path.exists():
        return "skip"
    try:
        r = requests.get(url, timeout=30, headers=HEADERS)
        r.raise_for_status()
        path.write_bytes(r.content)
        return "ok"
    except Exception:
        return "fail"


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--json", default="imagenes_sra_liebre.json")
    p.add_argument("--output", default="imagenes")
    p.add_argument("--workers", type=int, default=8)
    p.add_argument("--skip-existing", action="store_true")
    args = p.parse_args()

    base = Path(__file__).resolve().parent
    json_path = base / args.json
    output_dir = base / args.output

    if not json_path.exists():
        print(f"No existe: {json_path}")
        sys.exit(1)

    data = json.load(open(json_path, encoding="utf-8"))
    urls = []
    seen = set()
    for item in data:
        for u in item.get("images", []):
            if u and u not in seen:
                seen.add(u)
                urls.append(u)

    output_dir.mkdir(parents=True, exist_ok=True)
    items = list(enumerate(urls))

    def worker(x):
        return download(x, output_dir, args.skip_existing)

    results = list(pl.thread.map(worker, items, workers=args.workers))
    ok, skip, fail = results.count("ok"), results.count("skip"), results.count("fail")
    print(f"{len(urls)} imágenes → {ok} ok, {skip} omitidas, {fail} fallos")


if __name__ == "__main__":
    main()
