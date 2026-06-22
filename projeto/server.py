#!/usr/bin/env python3
"""
Servidor web — App Paraná
Serve a aplicação frontend de forma estática
"""
import http.server
import socketserver
import os
from pathlib import Path

os.chdir(Path(__file__).parent / 'frontend')
PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"🚀 Servidor rodando em http://localhost:{PORT}")
    print(f"   Frontend: http://localhost:{PORT}/index.html")
    print(f"   Pressione Ctrl+C para parar")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n✓ Servidor parado")
