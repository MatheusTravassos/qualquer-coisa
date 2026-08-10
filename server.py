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
            "name": "Parque Ambiental Jardim Botânico",
            "desc": "Um dos principais espaços verdes de Ivaiporã, com lago, áreas de lazer, caminhada e contato com a natureza.",
            "descEn": "One of Ivaiporã's main green spaces, with a lake, leisure areas, walking paths and contact with nature.",
        },
        {
            "name": "Lago das Flores",
            "desc": "Ponto turístico e de lazer de Ivaiporã, com pista de caminhada, paisagismo e espaços para convivência.",
            "descEn": "A leisure and tourism spot in Ivaiporã, with a walking path, landscaping and community spaces.",
        },
        {
            "name": "Praça Manoel Teodoro da Rocha",
            "desc": "Praça preservada de Ivaiporã e um dos espaços urbanos indicados para conhecer a cidade.",
            "descEn": "A preserved square in Ivaiporã and one of the urban spaces worth visiting in the city.",
        },
        {
            "name": "Casa da Memória Vera Vargas",
            "desc": "Espaço cultural voltado à preservação da memória e da história local, instalado junto ao Parque Jardim Botânico.",
            "descEn": "A cultural space dedicated to preserving local memory and history, located by the Botanical Garden Park.",
        },
        {
            "name": "Estação Ecológica Faian",
            "desc": "Área verde de preservação ambiental de Ivaiporã.",
            "descEn": "An environmental preservation area in Ivaiporã.",
        },
        {
            "name": "Horto Florestal Cayuá",
            "desc": "Área ligada à conservação ambiental e aos espaços verdes do município.",
            "descEn": "An area connected to environmental conservation and the city's green spaces.",
        },
        {
            "name": "IFPR - Campus Ivaiporã",
            "desc": "Campus do Instituto Federal do Paraná em Ivaiporã.",
            "descEn": "The Federal Institute of Paraná campus in Ivaiporã.",
        },
        {
            "name": "Univale - Faculdade",
            "desc": "Instituição de ensino superior localizada na Avenida Minas Gerais, em Ivaiporã.",
            "descEn": "A higher education institution located on Minas Gerais Avenue in Ivaiporã.",
        },
        {
            "name": "Café do Urso",
            "desc": "Cafeteria localizada na Avenida Paraná, no Centro de Ivaiporã.",
            "descEn": "A coffee shop located on Paraná Avenue in downtown Ivaiporã.",
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
