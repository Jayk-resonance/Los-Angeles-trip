#!/usr/bin/env python3
"""Create responsive WebP travel images without upscaling the source."""

from __future__ import annotations

import argparse
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError as exc:  # pragma: no cover - friendly CLI failure
    raise SystemExit(
        "Pillow is required. Run: python -m pip install -r scripts/requirements.txt"
    ) from exc


DEFAULT_WIDTHS = (640, 1600)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create 640px and 1600px WebP variants for the travel site."
    )
    parser.add_argument("input", type=Path, help="JPEG, PNG or WebP source image")
    parser.add_argument(
        "--output-dir", type=Path, default=Path("public"), help="Output directory"
    )
    parser.add_argument("--stem", help="Output filename stem; defaults to source stem")
    parser.add_argument(
        "--quality", type=int, default=82, choices=range(1, 101), metavar="1-100"
    )
    parser.add_argument(
        "--overwrite", action="store_true", help="Replace existing output files"
    )
    return parser.parse_args()


def output_image(source: Image.Image, target_width: int) -> Image.Image:
    width, height = source.size
    final_width = min(width, target_width)
    final_height = max(1, round(height * final_width / width))
    if (final_width, final_height) == source.size:
        return source.copy()
    return source.resize((final_width, final_height), Image.Resampling.LANCZOS)


def main() -> int:
    args = parse_args()
    input_path = args.input.expanduser().resolve()
    if not input_path.is_file():
        raise SystemExit(f"Input image not found: {input_path}")

    output_dir = args.output_dir.expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    stem = args.stem or input_path.stem

    with Image.open(input_path) as opened:
        source = ImageOps.exif_transpose(opened)
        source.seek(0)
        source = source.convert("RGBA" if "A" in source.getbands() else "RGB")

        for width in DEFAULT_WIDTHS:
            target = output_dir / f"{stem}-{width}.webp"
            if target.exists() and not args.overwrite:
                raise SystemExit(f"Output exists (use --overwrite): {target}")
            optimized = output_image(source, width)
            optimized.save(target, "WEBP", quality=args.quality, method=6)
            print(f"{target}  {optimized.width}x{optimized.height}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
