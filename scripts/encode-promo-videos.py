#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["imageio-ffmpeg"]
# ///
"""Re-encode the brand_promo reels into web-ready assets for public/videos/.

The source renders in ``brand_promo/output`` are high-quality masters (1.7-2.9 MB
each, MP4 only) meant for social distribution. The homepage showcase card renders
them at roughly a third of their native width, so they are downscaled here and
encoded into three codec tiers plus a first-frame poster.

The masters are slideshows of static app screenshots with cross-fades, which
compress far better than live motion -- hence the aggressive CRF values.

Usage:
    uv run scripts/encode-promo-videos.py [--source DIR] [--only desktop]
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

import imageio_ffmpeg

REPO_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SOURCE = Path.home() / "projects" / "brand_promo" / "output"
OUTPUT_DIR = REPO_ROOT / "public" / "videos"

# Per-variant byte budget. Slideshow content should land well under this; a tier
# that overshoots is a signal to raise CRF, not to silently ship a heavy file.
SIZE_BUDGET_BYTES = 400 * 1024


# The masters are 24 fps, but the content is 7 stills joined by 8-frame
# cross-fades. Halving to 15 fps costs nothing visible and removes ~30% of the
# bitrate, which buys back spatial quality that a higher CRF would have spent on
# smearing caption text.
OUTPUT_FPS = 15


@dataclass(frozen=True)
class Variant:
    """One device rendition of the promo reel.

    CRF values are tuned per variant: the portrait cuts carry larger on-screen
    type and more inter-frame change, so they need more compression to hit the
    same byte budget as the landscape cut.
    """

    name: str
    source_name: str
    width: int
    height: int
    crf: dict[str, int]


VARIANTS = (
    # Desktop is kept at source resolution: the stacked layout renders it at the
    # full 1280 px container width, so 1280x720 would be a 1:1 map with no
    # headroom left for 2x displays.
    Variant("desktop", "fund-investigator-promo-desktop-hq.mp4", 1920, 1080,
            {"av1": 46, "vp9": 52, "h264": 37}),
    Variant("ipad", "fund-investigator-promo-ipad-hq.mp4", 900, 1200,
            {"av1": 48, "vp9": 50, "h264": 36}),
    Variant("mobile", "fund-investigator-promo-mobile-hq.mp4", 720, 1280,
            {"av1": 42, "vp9": 48, "h264": 32}),
)

# Codec tiers in the order they are offered to the browser. AV1 is smallest but
# has the narrowest support, so it is listed first and H.264 last.
CODEC_TIERS = {
    "av1": {
        "suffix": ".av1.webm",
        "args": ["-c:v", "libaom-av1", "-b:v", "0",
                 "-cpu-used", "6", "-row-mt", "1", "-tiles", "2x2"],
    },
    "vp9": {
        "suffix": ".webm",
        "args": ["-c:v", "libvpx-vp9", "-b:v", "0", "-row-mt", "1"],
    },
    "h264": {
        "suffix": ".mp4",
        "args": ["-c:v", "libx264", "-preset", "slow",
                 "-pix_fmt", "yuv420p", "-movflags", "+faststart"],
    },
}


def run(ffmpeg: str, args: list[str], label: str) -> None:
    """Run one ffmpeg invocation, surfacing its stderr only when it fails."""
    result = subprocess.run(
        [ffmpeg, "-hide_banner", "-loglevel", "error", "-y", *args],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        sys.exit(f"{label} failed:\n{result.stderr}")


def human(size: int) -> str:
    return f"{size / 1024:.0f} KB"


def encode_variant(ffmpeg: str, variant: Variant, source: Path) -> list[tuple[str, int]]:
    """Encode every codec tier plus the poster for one variant."""
    scale = f"scale={variant.width}:{variant.height}:flags=lanczos"
    video_filter = f"fps={OUTPUT_FPS},{scale}"
    results: list[tuple[str, int]] = []

    for tier, spec in CODEC_TIERS.items():
        target = OUTPUT_DIR / f"promo-{variant.name}{spec['suffix']}"
        crf = str(variant.crf[tier])
        print(f"  {tier:>5} crf{crf:>3} -> {target.name} ...", flush=True)
        run(
            ffmpeg,
            ["-i", str(source), "-vf", video_filter, "-an",
             *spec["args"], "-crf", crf, str(target)],
            f"{variant.name}/{tier}",
        )
        results.append((target.name, target.stat().st_size))

    # The shipped *-poster-hq.png files are the *final* frame (the end card), which
    # is the wrong still to show before playback. Take frame 0 instead.
    poster = OUTPUT_DIR / f"promo-{variant.name}-poster.webp"
    print(f"  poster -> {poster.name} ...", flush=True)
    run(
        ffmpeg,
        ["-i", str(source), "-vf", scale, "-frames:v", "1", "-c:v", "libwebp",
         "-quality", "80", str(poster)],
        f"{variant.name}/poster",
    )
    results.append((poster.name, poster.stat().st_size))
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE,
                        help="directory holding the brand_promo HQ masters")
    parser.add_argument("--only", choices=[v.name for v in VARIANTS],
                        help="encode a single variant instead of all three")
    args = parser.parse_args()

    if not args.source.is_dir():
        sys.exit(f"Source directory not found: {args.source}")

    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    selected = [v for v in VARIANTS if args.only in (None, v.name)]

    all_results: list[tuple[str, int]] = []
    for variant in selected:
        source = args.source / variant.source_name
        if not source.exists():
            sys.exit(f"Missing master: {source}")
        print(f"{variant.name} ({variant.width}x{variant.height})")
        all_results.extend(encode_variant(ffmpeg, variant, source))

    print("\nResults:")
    over_budget = []
    for name, size in all_results:
        flag = ""
        if name.endswith((".webm", ".mp4")) and size > SIZE_BUDGET_BYTES:
            flag = "  OVER BUDGET"
            over_budget.append(name)
        print(f"  {human(size):>8}  {name}{flag}")

    if over_budget:
        print(f"\n{len(over_budget)} file(s) exceed the {human(SIZE_BUDGET_BYTES)} "
              "budget -- raise CRF before lowering resolution.")


if __name__ == "__main__":
    main()
