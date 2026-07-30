#!/usr/bin/env python3
"""Servidor local do Ivaiporã Turismo.

Serve o frontend canônico em ``frontend/`` e disponibiliza uma API JSON simples
em ``/api/data`` para desenvolvimento local.
"""
from __future__ import annotations

import hmac
import http.server
import json
import os
import socketserver
import sys
from functools import partial
from pathlib import Path
from urllib.parse import urlparse

if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except (AttributeError, LookupError):
        pass

PROJECT_DIR = Path(__file__).resolve().parent
FRONTEND_DIR = PROJECT_DIR / "frontend"
DB_FILE = PROJECT_DIR / "db.json"
PORT = int(os.environ.get("PORT", "8080"))
ADMIN_TOKEN = os.environ.get("IVAIPORA_ADMIN_TOKEN", "").strip()
MAX_REQUEST_SIZE = 1_000_000

DEFAULT_DATA = {
    "attractions": [
        {
            "name": "Lago de Santana",
            "desc": "Ótimo ponto para lazer, caminhadas e pesca à beira do lago. Muito popular entre famílias nos fins de semana.",
            "descEn": "Great spot for leisure, walks and fishing by the lake. Very popular among families on weekends.",
        },
        {
            "name": "Parque Ecológico de Ivaiporã",
            "desc": "Paisagens naturais preservadas com trilhas, fauna e flora do bioma Mata Atlântica.",
            "descEn": "Preserved natural landscapes with trails, fauna and flora of the Atlantic Forest biome.",
        },
        {
            "name": "Centro Cultural de Ivaiporã",
            "desc": "Eventos culturais, feiras de artesanato e gastronomia regional no coração da cidade.",
            "descEn": "Cultural events, craft fairs and regional cuisine in the heart of the city.",
        },
        {
            "name": "Casa da Memória Vera Vargas (Museu)",
            "desc": "Espaço cultural dedicado à preservação da história de Ivaiporã, reunindo fotos, documentos e peças históricas recolhidas da própria comunidade.",
            "descEn": "Cultural space dedicated to preserving Ivaiporã's history, gathering photos, documents, and historical artifacts from the community.",
        },
        {
            "name": "Univale - Faculdade",
            "desc": "Faculdades Integradas do Vale do Ivaí, importante polo de ensino superior presencial na região central.",
            "descEn": "Vale do Ivaí Integrated Colleges, a key higher education hub in the central region.",
        },
        {
            "name": "IFPR - Campus Ivaiporã",
            "desc": "Campus do Instituto Federal do Paraná, com ensino técnico e cursos superiores públicos e gratuitos.",
            "descEn": "Federal Institute of Paraná campus offering technical and free public higher education.",
        },
        {
            "name": "Cafeteria Florenza",
            "desc": "Ponto gastronômico tradicional na Avenida Paraná, reconhecido pelos cafés, lanches, tortas e pães artesanais.",
            "descEn": "Traditional dining spot on Paraná Avenue, known for coffee, snacks, pies and artisanal breads.",
        },
        {
            "name": "Café do Urso",
            "desc": "Cafeteria temática com cafés gourmet, tortas e ambiente aconchegante.",
            "descEn": "Themed coffee shop with gourmet coffee, pies and a cozy atmosphere.",
        },
        {
            "name": "Praça Manoel Ribas",
            "desc": "Praça central da cidade, ponto de encontro com arborização e espaço para eventos.",
            "descEn": "Central square and meeting point with trees and event spaces.",
        },
        {
            "name": "Cachoeira do Rio Bom",
            "desc": "Cachoeira de fácil acesso na região, ideal para banho e contato com a natureza.",
            "descEn": "Easy-access waterfall, ideal for swimming and contact with nature.",
        },
        {
            "name": "Mirante da Serra",
            "desc": "Vista panorâmica da cidade e do vale do Rio Ivaí.",
            "descEn": "Panoramic view of the city and the Ivaí River valley.",
        },
        {
            "name": "Igreja Matriz São João Batista",
            "desc": "Principal templo religioso da cidade, com arquitetura marcante.",
            "descEn": "The city's main religious temple, with striking architecture.",
        },
        {
            "name": "Feira do Produtor Rural",
            "desc": "Produtos coloniais, queijos, mel e artesanato local aos sábados.",
            "descEn": "Colonial products, cheese, honey and local crafts on Saturdays.",
        },
    ]
}


def load_db() -> dict:
    if not DB_FILE.exists():
        return json.loads(json.dumps(DEFAULT_DATA, ensure_ascii=False))
    try:
        with DB_FILE.open("r", encoding="utf-8") as file:
            data = json.load(file)
        if not isinstance(data, dict) or not isinstance(data.get("attractions"), list):
            raise ValueError("estrutura inválida")
        return data
    except (OSError, ValueError, json.JSONDecodeError) as error:
        print(f"Aviso: db.json inválido; usando dados padrão ({error}).", file=sys.stderr)
        return json.loads(json.dumps(DEFAULT_DATA, ensure_ascii=False))


def save_db(data: dict) -> None:
    temporary_file = DB_FILE.with_suffix(".json.tmp")
    with temporary_file.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)
        file.flush()
        os.fsync(file.fileno())
    temporary_file.replace(DB_FILE)


class IvaiporaRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("X-Content-Type-Options", "nosniff")
        super().end_headers()

    def send_json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:  # noqa: N802
        if urlparse(self.path).path == "/api/data":
            self.send_json(200, load_db())
            return
        super().do_GET()

    def do_POST(self) -> None:  # noqa: N802
        if urlparse(self.path).path != "/api/data":
            self.send_json(404, {"error": "Rota não encontrada"})
            return

        if not ADMIN_TOKEN:
            self.send_json(503, {"error": "Defina IVAIPORA_ADMIN_TOKEN no servidor"})
            return

        auth_header = self.headers.get("Authorization", "")
        supplied_token = auth_header.removeprefix("Bearer ").strip()
        if not supplied_token or not hmac.compare_digest(supplied_token, ADMIN_TOKEN):
            self.send_json(401, {"error": "Acesso não autorizado"})
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json(400, {"error": "Content-Length inválido"})
            return

        if content_length <= 0 or content_length > MAX_REQUEST_SIZE:
            self.send_json(413, {"error": "Corpo da requisição vazio ou grande demais"})
            return

        try:
            data = json.loads(self.rfile.read(content_length).decode("utf-8"))
            if not isinstance(data, dict) or not isinstance(data.get("attractions"), list):
                raise ValueError("o JSON deve conter uma lista 'attractions'")
            save_db(data)
        except (UnicodeDecodeError, json.JSONDecodeError, ValueError) as error:
            self.send_json(400, {"error": f"JSON inválido: {error}"})
            return
        except OSError as error:
            self.send_json(500, {"error": f"Erro ao salvar dados: {error}"})
            return

        self.send_json(200, {"success": True})


class ReusableThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main() -> None:
    if not (FRONTEND_DIR / "index.html").exists():
        raise SystemExit("frontend/index.html não encontrado. Verifique a estrutura do projeto.")

    handler = partial(IvaiporaRequestHandler, directory=str(FRONTEND_DIR))
    with ReusableThreadingTCPServer(("", PORT), handler) as httpd:
        print(f"Servidor Ivaiporã Turismo: http://localhost:{PORT}")
        if not ADMIN_TOKEN:
            print("API em modo somente leitura. Defina IVAIPORA_ADMIN_TOKEN para habilitar POST /api/data.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor parado.")


if __name__ == "__main__":
    main()
