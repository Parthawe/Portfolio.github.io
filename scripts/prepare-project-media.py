"""Generate intrinsic sizes and economical display variants for project media.
Run with Python + Pillow after adding source images. Originals remain untouched.
"""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json, re, subprocess
root = Path(__file__).resolve().parents[1]
refs = set()
for folder in ['src/pages/projects', 'src/components/case-study', 'src/data']:
    for p in (root / folder).rglob('*'):
        if p.suffix in ['.tsx', '.ts']:
            text = p.read_text()
            constants = dict(re.findall(r"const (\w+) = ['\"](/Assets/[^'\"]+)['\"]", text))
            for name, base in constants.items():
                text = text.replace('${' + name + '}', base)
            refs.update(re.findall(r'''["'`](/Assets/[^"'`$]+?\.(?:png|jpg|jpeg|webp)(?:\?[^"'`]*)?)["'`]''', text))
from urllib.parse import unquote, quote
out = root / 'public/Assets/project-display'
out.mkdir(exist_ok=True)
manifest = {}
for ref in sorted(refs):
    key = unquote(ref.split('?')[0]); source = root / 'public' / key.lstrip('/')
    if not source.is_file(): continue
    # Never create publicly served derivatives from an ignored/private original.
    ignored = subprocess.run(['git', 'check-ignore', '-q', str(source)], cwd=root)
    if ignored.returncode == 0: continue
    if ignored.returncode != 1: raise RuntimeError(f'Could not check media visibility: {source}')
    try:
        with Image.open(source) as original:
            im = ImageOps.exif_transpose(original)
            w, h = im.size
            entry = {'width': w, 'height': h}
            variants = []
            if source.stat().st_size > 180_000 and w > 1000:
                digest = hashlib.sha256(source.read_bytes()).hexdigest()[:14]
                for size in [640, 1040, 1600]:
                    if size >= w: continue
                    filename = f'{digest}-{size}.webp'; dest = out / filename
                    if not dest.exists():
                        resized = im.copy(); resized.thumbnail((size, round(h * size / w)), Image.Resampling.LANCZOS)
                        resized.save(dest, 'WEBP', quality=86, method=4)
                    variants.append(f'/Assets/project-display/{filename} {size}w')
                variants.append(f"{quote(ref, safe='/?=&%')} {w}w")
                entry['srcSet'] = ', '.join(variants)
            manifest[key] = entry
    except OSError: pass
(root / 'src/data/projectImageMetadata.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'{len(manifest)} image dimensions; {sum("srcSet" in x for x in manifest.values())} responsive image sets')
