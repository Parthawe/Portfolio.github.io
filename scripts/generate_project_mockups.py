#!/usr/bin/env python3

import json
import math
import random
import subprocess
from pathlib import Path
from typing import Optional

from PIL import Image, ImageChops, ImageColor, ImageDraw, ImageFilter, ImageOps
from PIL import UnidentifiedImageError


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "Assets" / "mockups" / "projects"
SIZE = 2048
DEFAULT_BG = "#F4F1EA"
GRAPHITE_BG = "#1B1C20"
WARM_BG = "#F1EAE0"
COOL_BG = "#EAEFF4"

PRODUCT_SYSTEMS = {
    "mentra",
    "mentra-miniapps",
    "transfi-project",
    "zentipay",
    "executivelens",
    "org-dashboard",
    "cuetv",
    "healthapp",
    "ibm",
    "ballah-code",
    "oncall-lens",
    "ai-voice",
    "raahi-project",
    "the-point-cdc",
    "office-of-diversity",
}

BRAND_AI = {
    "clawed-chat",
    "mentra-brand",
    "vj-software",
    "typeface",
    "code-for-build",
}

PHYSICAL = {
    "jugalbandi",
    "keyboard-project",
    "black-hole",
    "enigma",
    "shuffle",
    "making-of-time",
    "sea-of-salt",
    "dna-speculative",
    "revolving-stage",
    "moniac-machine",
    "drowning",
    "sculpture",
    "tedx",
    "vishwaconclave",
    "arcade-lab",
    "the-omakase",
}

ABSTRACT_MOTIFS = {
    "flow-fields": "dots",
    "embodied-web": "mesh",
    "feeling-patterns": "waves",
    "performance-by-design": "stack",
    "on-becoming": "slices",
    "storytelling": "frames",
    "comp-media": "nodes",
    "hypercinema": "portals",
    "applications": "cards",
    "messy-humans": "pebbles",
    "production-studio": "spotlights",
    "atps": "waveform",
}


def run_manifest():
    cmd = [
        "bun",
        "-e",
        """
import('./src/data/projects.ts').then(({projects}) => {
  const simplified = projects.map(p => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    cardMockupSource: p.cardMockupSource ?? null,
    image: p.image,
    summaryImage: p.summaryImage ?? null,
    hoverMedia: p.hoverMedia?.src ?? null,
    hidden: !!p.hidden,
  }));
  console.log(JSON.stringify(simplified));
});
""",
    ]
    result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(result.stdout)


def repo_path(asset_path: Optional[str]) -> Optional[Path]:
    if not asset_path:
        return None
    clean = asset_path.replace("/Portfolio.github.io/", "", 1).lstrip("/")
    direct = ROOT / clean
    public = ROOT / "public" / clean
    if direct.exists():
        return direct
    if public.exists():
        return public
    return None


def project_family(slug: str) -> str:
    if slug in PRODUCT_SYSTEMS:
        return "product"
    if slug in BRAND_AI:
        return "brand"
    if slug in PHYSICAL:
        return "physical"
    return "abstract"


def rgba(value: str, alpha: int = 255):
    r, g, b = ImageColor.getrgb(value)
    return (r, g, b, alpha)


def vertical_gradient(size: tuple[int, int], top: str, bottom: str) -> Image.Image:
    img = Image.new("RGBA", size)
    draw = ImageDraw.Draw(img)
    r1, g1, b1 = ImageColor.getrgb(top)
    r2, g2, b2 = ImageColor.getrgb(bottom)
    width, height = size
    for y in range(height):
        t = y / max(1, height - 1)
        r = int(r1 + (r2 - r1) * t)
        g = int(g1 + (g2 - g1) * t)
        b = int(b1 + (b2 - b1) * t)
        draw.line((0, y, width, y), fill=(r, g, b, 255))
    return img


def radial_glow(size, center, radius, color, alpha):
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    x, y = center
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=rgba(color, alpha))
    return glow.filter(ImageFilter.GaussianBlur(radius // 2))


def add_shadow(base: Image.Image, mask: Image.Image, offset=(0, 20), blur=48, color=(0, 0, 0, 120)):
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    tinted = Image.new("RGBA", mask.size, color)
    shadow.paste(tinted, offset, mask)
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    base.alpha_composite(shadow)


def fit_contain(image: Image.Image, box: tuple[int, int]) -> Image.Image:
    result = image.copy()
    result.thumbnail(box, Image.Resampling.LANCZOS)
    return result


def fit_cover(image: Image.Image, box: tuple[int, int]) -> Image.Image:
    return ImageOps.fit(image, box, Image.Resampling.LANCZOS)


def has_transparency(image: Image.Image) -> bool:
    if image.mode != "RGBA":
        return False
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if not bbox:
        return False
    extrema = alpha.getextrema()
    return extrema[0] < 250


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def average_color(image: Image.Image):
    small = image.convert("RGB").resize((1, 1), Image.Resampling.BOX)
    return small.getpixel((0, 0))


def place_plate(base: Image.Image, image: Image.Image, rect, radius, background, inner_pad=52):
    x, y, w, h = rect
    plate = Image.new("RGBA", (w, h), rgba(background))
    mask = rounded_mask((w, h), radius)
    plate.putalpha(mask)
    add_shadow(base, mask, offset=(x, y + 24), blur=52, color=(5, 8, 12, 56))
    base.alpha_composite(plate, (x, y))

    inner_w = max(64, w - inner_pad * 2)
    inner_h = max(64, h - inner_pad * 2)
    img = fit_contain(image, (inner_w, inner_h))
    ix = x + (w - img.width) // 2
    iy = y + (h - img.height) // 2
    base.alpha_composite(img, (ix, iy))


def place_frame(base: Image.Image, image: Image.Image, rect, radius, matte, crop=False):
    x, y, w, h = rect
    frame = Image.new("RGBA", (w, h), rgba(matte))
    mask = rounded_mask((w, h), radius)
    frame.putalpha(mask)
    add_shadow(base, mask, offset=(x, y + 18), blur=48, color=(0, 0, 0, 66))
    base.alpha_composite(frame, (x, y))

    inner_pad = 38
    inner_w = w - inner_pad * 2
    inner_h = h - inner_pad * 2
    inner = fit_cover(image, (inner_w, inner_h)) if crop else fit_contain(image, (inner_w, inner_h))
    inner_mask = rounded_mask((inner_w, inner_h), max(18, radius - 20))
    framed = Image.new("RGBA", (inner_w, inner_h), (0, 0, 0, 0))
    framed.paste(inner, (0, 0))
    framed.putalpha(inner_mask)
    base.alpha_composite(framed, (x + inner_pad, y + inner_pad))


def place_crop_chip(base: Image.Image, image: Image.Image, rect, radius, matte):
    x, y, w, h = rect
    place_frame(base, fit_cover(image, (w * 2, h * 2)), rect, radius, matte, crop=True)


def draw_mesh(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    cols = 6
    rows = 6
    pts = []
    for yi in range(rows):
        row = []
        for xi in range(cols):
            px = x0 + (x1 - x0) * xi / (cols - 1)
            py = y0 + (y1 - y0) * yi / (rows - 1)
            if 0 < xi < cols - 1 and 0 < yi < rows - 1:
                px += random.randint(-36, 36)
                py += random.randint(-36, 36)
            row.append((px, py))
        pts.append(row)
    for row in pts:
        draw.line(row, fill=color, width=4)
    for xi in range(cols):
        draw.line([pts[yi][xi] for yi in range(rows)], fill=color, width=4)


def draw_waves(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    mid = (y0 + y1) / 2
    for i in range(7):
        pts = []
        for step in range(28):
            t = step / 27
            x = x0 + (x1 - x0) * t
            y = mid + math.sin(t * math.pi * 2 + i * 0.55) * (42 + i * 8) + (i - 3) * 38
            pts.append((x, y))
        draw.line(pts, fill=color, width=5)


def draw_nodes(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    points = []
    for _ in range(18):
        px = random.randint(int(x0), int(x1))
        py = random.randint(int(y0), int(y1))
        points.append((px, py))
    for idx, p in enumerate(points):
        near = sorted(points, key=lambda q: (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2)[1:4]
        for q in near:
            draw.line((p, q), fill=color, width=3)
    for p in points:
        draw.ellipse((p[0] - 10, p[1] - 10, p[0] + 10, p[1] + 10), fill=color)


def draw_portals(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    for i in range(5):
        inset = 34 * i
        draw.rounded_rectangle((x0 + inset, y0 + inset, x1 - inset, y1 - inset), radius=46 - i * 5, outline=color, width=5)


def draw_cards(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    offsets = [(-120, 90), (0, 0), (120, -90)]
    for dx, dy in offsets:
        draw.rounded_rectangle((x0 + dx, y0 + dy, x1 + dx, y1 + dy), radius=40, outline=color, width=6)


def draw_pebbles(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    for _ in range(13):
        w = random.randint(120, 260)
        h = random.randint(90, 190)
        x = random.randint(int(x0), int(x1 - w))
        y = random.randint(int(y0), int(y1 - h))
        draw.rounded_rectangle((x, y, x + w, y + h), radius=min(w, h) // 2, outline=color, width=5)


def draw_spotlights(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    cx = (x0 + x1) / 2
    for i in range(3):
        rx = 120 + i * 90
        draw.arc((cx - rx, y0 + 120 + i * 80, cx + rx, y1 - 60 + i * 40), start=205, end=335, fill=color, width=6)
    draw.line((cx - 220, y0 + 130, cx - 80, y0 + 30), fill=color, width=6)
    draw.line((cx + 220, y0 + 130, cx + 80, y0 + 30), fill=color, width=6)


def draw_waveform(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    mid = (y0 + y1) / 2
    step = (x1 - x0) / 18
    for i in range(18):
        x = x0 + step * i
        amp = [0.2, 0.5, 0.85, 0.35, 0.7][i % 5]
        h = (y1 - y0) * amp * 0.42
        draw.line((x, mid - h, x, mid + h), fill=color, width=12)


def draw_slices(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    for i in range(5):
        inset = i * 42
        draw.rounded_rectangle((x0 + inset, y0 + inset, x1 - inset, y1 - inset), radius=64, outline=color, width=6)


def draw_stack(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    for i in range(7):
        y = y0 + i * ((y1 - y0) / 7)
        draw.rounded_rectangle((x0 + i * 24, y, x1 - i * 24, y + 86), radius=28, outline=color, width=5)


def draw_dots(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    for row in range(8):
        for col in range(8):
            x = x0 + col * ((x1 - x0) / 7)
            y = y0 + row * ((y1 - y0) / 7)
            x += math.sin(row * 0.8 + col) * 12
            y += math.cos(col * 0.6 + row) * 12
            draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=color)


def draw_frames(draw, bbox, color):
    x0, y0, x1, y1 = bbox
    for i in range(4):
        inset = 48 * i
        draw.rectangle((x0 + inset, y0 + inset, x1 - inset, y1 - inset), outline=color, width=5)


def abstract_cover(project, base):
    draw = ImageDraw.Draw(base)
    motif = ABSTRACT_MOTIFS.get(project["slug"], "mesh")
    accent = "#596372" if project["category"] in {"ux", "good"} else "#6A5A72"
    bbox = (300, 300, 1748, 1748)
    if motif == "mesh":
        draw_mesh(draw, bbox, rgba(accent, 185))
    elif motif == "waves":
        draw_waves(draw, bbox, rgba(accent, 190))
    elif motif == "nodes":
        draw_nodes(draw, bbox, rgba(accent, 185))
    elif motif == "portals":
        draw_portals(draw, bbox, rgba(accent, 185))
    elif motif == "cards":
        draw_cards(draw, bbox, rgba(accent, 185))
    elif motif == "pebbles":
        draw_pebbles(draw, bbox, rgba(accent, 175))
    elif motif == "spotlights":
        draw_spotlights(draw, bbox, rgba(accent, 190))
    elif motif == "waveform":
        draw_waveform(draw, bbox, rgba(accent, 190))
    elif motif == "slices":
        draw_slices(draw, bbox, rgba(accent, 180))
    elif motif == "stack":
        draw_stack(draw, bbox, rgba(accent, 185))
    elif motif == "dots":
        draw_dots(draw, bbox, rgba(accent, 190))
    elif motif == "frames":
        draw_frames(draw, bbox, rgba(accent, 185))
    else:
        draw_mesh(draw, bbox, rgba(accent, 185))


def create_cover(project):
    random.seed(project["slug"])
    family = project_family(project["slug"])
    primary_path = (
        repo_path(project.get("cardMockupSource"))
        or repo_path(project.get("summaryImage"))
        or repo_path(project.get("image"))
        or repo_path(project.get("hoverMedia"))
    )
    secondary_path = repo_path(project.get("image"))

    if family == "product":
        bg = vertical_gradient((SIZE, SIZE), GRAPHITE_BG, "#272A31")
        bg.alpha_composite(radial_glow((SIZE, SIZE), (540, 420), 520, "#47566B", 120))
        bg.alpha_composite(radial_glow((SIZE, SIZE), (1500, 1460), 680, "#78695A", 72))
    elif family == "brand":
        bg = vertical_gradient((SIZE, SIZE), "#1A1A1E", "#26282D")
        bg.alpha_composite(radial_glow((SIZE, SIZE), (420, 1320), 520, "#7C4E44", 96))
        bg.alpha_composite(radial_glow((SIZE, SIZE), (1510, 520), 420, "#4E5766", 82))
    elif family == "physical":
        bg = vertical_gradient((SIZE, SIZE), DEFAULT_BG, WARM_BG)
        bg.alpha_composite(radial_glow((SIZE, SIZE), (1024, 1380), 820, "#D7C5B5", 92))
        bg.alpha_composite(radial_glow((SIZE, SIZE), (1620, 480), 360, "#B9C0C8", 48))
    else:
        bg = vertical_gradient((SIZE, SIZE), "#F6F3EC", COOL_BG)
        bg.alpha_composite(radial_glow((SIZE, SIZE), (1400, 540), 420, "#C8D2E0", 62))

    if primary_path and primary_path.suffix.lower() != ".svg":
        try:
            img = Image.open(primary_path).convert("RGBA")
        except UnidentifiedImageError:
            abstract_cover(project, bg)
            return bg.convert("RGB")
        avg = average_color(img)
        accent = "#{:02x}{:02x}{:02x}".format(*avg)
        bg.alpha_composite(radial_glow((SIZE, SIZE), (1024, 720), 460, accent, 62 if family != "physical" else 34))

        if not has_transparency(img):
            return fit_cover(img, (SIZE, SIZE)).convert("RGB")

        contain_box = {
            "product": (1540, 1540),
            "brand": (1600, 1600),
            "physical": (1500, 1500),
            "abstract": (1520, 1520),
        }[family]
        shadow_color = {
            "product": (3, 6, 11, 132),
            "brand": (0, 0, 0, 136),
            "physical": (32, 24, 18, 86),
            "abstract": (18, 22, 28, 96),
        }[family]
        object_img = fit_contain(img, contain_box)
        mask = object_img.getchannel("A")
        ox = (SIZE - object_img.width) // 2
        oy = (SIZE - object_img.height) // 2
        add_shadow(bg, mask, offset=(ox + 18, oy + 40), blur=78, color=shadow_color)
        bg.alpha_composite(object_img, (ox, oy))
    else:
        abstract_cover(project, bg)

    return bg.convert("RGB")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    projects = run_manifest()
    for project in projects:
        cover = create_cover(project)
        out_path = OUT_DIR / f"{project['slug']}.webp"
        cover.save(out_path, format="WEBP", quality=88, method=6)
        print(out_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
