"""Encode bounded cover excerpts from existing public project recordings.

Requires ffmpeg on PATH, FFMPEG_EXE, or the optional imageio-ffmpeg tool.
No external footage, audio, generated mechanism, or runtime service is used.
"""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/Assets/cover-motion'
CLIPS = [
    ('mentra', 'Assets/Projects/mentra-brand/motion/official-product-intro.mp4', 0.1, 3.3),
    ('transfi-project', 'Assets/Projects/Transfi/motion/official-site-hero.mp4', 0.3, 4.2),
    ('jugalbandi', 'Assets/films/jugalbandi.mp4', 118, 4.2),
    ('enigma', 'Assets/films/enigma.mp4', 27, 4.2),
    ('moniac-machine', 'Assets/films/moniac-machine.mp4', 34, 4.2),
    ('the-omakase', 'Assets/films/the-omakase.mp4', 78, 4.2),
    ('drowning', 'Assets/films/drowning.mp4', 42, 4.2),
    ('making-of-time', 'Assets/films/making-of-time.mp4', 68, 4.2),
    ('vishwaconclave', 'Assets/Projects/VishwaConclave/motion-2021/theme-release.mp4', 55, 4.2),
    ('black-hole', 'Assets/Projects/black-hole-assets/time-dilation.mp4', 10, 4.2),
]
SCREENS = [
    ('miniapps-discover', 'Assets/Projects/mentra-miniapps/figma/store-discovery.png'),
    ('miniapps-detail', 'Assets/Projects/mentra-miniapps/figma/store-detail.png'),
    ('miniapps-installed', 'Assets/Projects/mentra-miniapps/figma/store-installed.png'),
    ('raahi-home', 'Assets/Projects/Raahi/photos/raahi-homepage.webp'),
    ('raahi-routes', 'Assets/Projects/Raahi/photos/route list.png'),
    ('raahi-itinerary', 'Assets/Projects/Raahi/photos/raahi-route-details.webp'),
]


def main():
    ffmpeg = os.environ.get('FFMPEG_EXE') or shutil.which('ffmpeg')
    if not ffmpeg:
        import imageio_ffmpeg
        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    OUT.mkdir(parents=True, exist_ok=True)
    records = []
    for slug, source, start, duration in CLIPS:
        original = ROOT / 'public' / source
        output = OUT / f'{slug}.mp4'
        subprocess.run([
            ffmpeg, '-hide_banner', '-loglevel', 'error', '-y',
            '-ss', str(start), '-i', str(original), '-t', str(duration),
            '-an', '-vf', 'fps=20,scale=640:-2', '-c:v', 'libx264',
            '-preset', 'slow', '-crf', '27', '-maxrate', '550k', '-bufsize', '1100k',
            '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-map_metadata', '-1',
            str(output),
        ], check=True)
        size = output.stat().st_size
        assert size < 400_000, (slug, size)
        records.append(dict(slug=slug, source='/' + source, startSeconds=start,
                            durationSeconds=duration, bytes=size,
                            sourceSHA256=hashlib.sha256(original.read_bytes()).hexdigest(),
                            outputSHA256=hashlib.sha256(output.read_bytes()).hexdigest(),
                            provenance='Excerpt from existing public project recording; no audio or generated footage.'))
    report = ROOT / 'docs/reviews/cover-motion/film-provenance.json'
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(json.dumps(records, indent=2) + '\n')
    print(f'{len(records)} excerpts; {sum(item["bytes"] for item in records):,} bytes in total')
    from PIL import Image
    screens = []
    for name, source in SCREENS:
        original = ROOT / 'public' / source
        image = Image.open(original).convert('RGB')
        original_size = image.size
        image.thumbnail((360, 2000), Image.Resampling.LANCZOS)
        output = OUT / f'{name}.webp'
        image.save(output, 'WEBP', quality=88, method=6)
        screens.append(dict(name=name, source='/' + source,
                            derivative='/Assets/cover-motion/' + name + '.webp',
                            originalSize=original_size, previewSize=image.size,
                            bytes=output.stat().st_size,
                            sourceSHA256=hashlib.sha256(original.read_bytes()).hexdigest(),
                            provenance='Web-size derivative of the original supplied screen; no UI added or removed.'))
    (report.parent / 'screen-provenance.json').write_text(json.dumps(screens, indent=2) + '\n')
    print(f'{len(screens)} screen derivatives; {sum(item["bytes"] for item in screens):,} bytes in total')


if __name__ == '__main__':
    main()
