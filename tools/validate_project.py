#!/usr/bin/env python3
"""Valida os arquivos estáticos e a cópia de compatibilidade do projeto."""
from __future__ import annotations

import hashlib
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"
APP = ROOT / "app"
CORE_FILES = ["index.html", "styles.css", "script.js"]
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)
    print(f"ERRO: {message}")


def main() -> int:
    errors: list[str] = []

    for filename in CORE_FILES:
        path = FRONTEND / filename
        if not path.is_file():
            fail(f"arquivo canônico ausente: {path.relative_to(ROOT)}", errors)

    if errors:
        return 1

    html = (FRONTEND / "index.html").read_text(encoding="utf-8")
    css = (FRONTEND / "styles.css").read_text(encoding="utf-8")
    js = (FRONTEND / "script.js").read_text(encoding="utf-8")
    combined = "\n".join((html, css, js))

    local_refs = set()
    reference_patterns = [
        r'''(?:src|href)=["']([^"']+)["']|url\(["']?([^)'"?#]+)''',
        r'''["']([^"']+\.(?:jpe?g|png|webp|gif|svg))["']''',
    ]
    for pattern in reference_patterns:
        for match in re.findall(pattern, combined, flags=re.IGNORECASE):
            parts = match if isinstance(match, tuple) else (match,)
            reference = next((part for part in parts if part), "").strip()
            if not reference or reference.startswith(("http://", "https://", "data:", "#", "mailto:")):
                continue
            reference = reference.split("?", 1)[0].split("#", 1)[0]
            if Path(reference).suffix.lower() in IMAGE_SUFFIXES or reference in CORE_FILES:
                local_refs.add(reference)

    for reference in sorted(local_refs):
        if not (FRONTEND / reference).is_file():
            fail(f"referência local quebrada em frontend/: {reference}", errors)

    html_ids = set(re.findall(r'''id=["']([^"']+)["']''', html))
    js_id_refs = set(re.findall(r'''getElementById\(["']([^"']+)["']''', js))
    for missing_id in sorted(js_id_refs - html_ids):
        fail(f"JavaScript referencia ID inexistente no HTML: {missing_id}", errors)

    translation_keys = set(re.findall(r'''data-i18n=["']([^"']+)["']''', html))
    for language, next_language in (("pt", "en"), ("en", "es")):
        match = re.search(rf"{language}:\s*\{{(.*?)\n\s*\}},\n\s*{next_language}:", js, flags=re.DOTALL)
        if not match:
            fail(f"catálogo de tradução ausente ou inválido: {language}", errors)
            continue
        catalog_keys = set(re.findall(r"^\s*([A-Za-z0-9_]+):", match.group(1), flags=re.MULTILINE))
        for key in sorted(translation_keys - catalog_keys):
            fail(f"tradução {language} ausente: {key}", errors)

    match = re.search(r"es:\s*\{(.*?)\n\s*\}\n\};", js, flags=re.DOTALL)
    if not match:
        fail("catálogo de tradução ausente ou inválido: es", errors)
    else:
        catalog_keys = set(re.findall(r"^\s*([A-Za-z0-9_]+):", match.group(1), flags=re.MULTILINE))
        for key in sorted(translation_keys - catalog_keys):
            fail(f"tradução es ausente: {key}", errors)

    for image in sorted(FRONTEND.glob("*")):
        if image.suffix.lower() not in IMAGE_SUFFIXES:
            continue
        signature = image.read_bytes()[:12]
        if image.suffix.lower() in {".jpg", ".jpeg"} and not signature.startswith(b"\xff\xd8\xff"):
            fail(f"{image.name} tem extensão JPEG, mas assinatura incompatível", errors)
        if image.suffix.lower() == ".png" and not signature.startswith(b"\x89PNG\r\n\x1a\n"):
            fail(f"{image.name} tem extensão PNG, mas assinatura incompatível", errors)

    for filename in CORE_FILES + [path.name for path in FRONTEND.glob("*.jpg")]:
        canonical = FRONTEND / filename
        mirror = APP / filename
        if not mirror.is_file():
            fail(f"espelho ausente em app/: {filename}", errors)
        elif digest(canonical) != digest(mirror):
            fail(f"espelho app/ desatualizado: {filename}", errors)

    node = shutil.which("node")
    if node:
        result = subprocess.run([node, "--check", str(FRONTEND / "script.js")], capture_output=True, text=True)
        if result.returncode != 0:
            fail(f"JavaScript inválido: {result.stderr.strip()}", errors)

    if errors:
        print(f"\nValidação falhou com {len(errors)} erro(s).")
        return 1

    print(f"Validação concluída: {len(local_refs)} referências locais e espelho app/ corretos.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
