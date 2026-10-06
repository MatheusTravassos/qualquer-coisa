"""
API Backend — Ivaiporã Turismo
Simples API em Python para gerenciar dados de Ivaiporã (quando integrado com banco de dados)
"""

import json
from datetime import datetime

# Banco de dados simulado (em memória) focado em Ivaiporã
DATABASE = {
    "regions": [
        {"id": 1, "name": "Centro", "info": "Região central de Ivaiporã, com comércio, serviços e espaços urbanos."},
        {"id": 2, "name": "Parque Jardim Botânico", "info": "Área verde e de lazer próxima ao centro da cidade."},
        {"id": 3, "name": "Parque Industrial", "info": "Região onde está localizado o Campus Ivaiporã do IFPR."}
    ],
    "attractions": [
        {"id": 1, "name": "Parque Ambiental Jardim Botânico", "desc": "Área verde, lago e espaços de lazer e caminhada.", "region_id": 2},
        {"id": 2, "name": "Lago das Flores", "desc": "Ponto turístico e de lazer com pista de caminhada e paisagismo.", "region_id": 1},
        {"id": 3, "name": "Casa da Memória Vera Vargas", "desc": "Espaço cultural de preservação da história local.", "region_id": 2},
        {"id": 4, "name": "IFPR - Campus Ivaiporã", "desc": "Instituição pública de ensino técnico e superior.", "region_id": 3},
        {"id": 5, "name": "Univale - Faculdade", "desc": "Instituição de ensino superior em Ivaiporã.", "region_id": 1},
        {"id": 6, "name": "Café do Urso", "desc": "Cafeteria localizada na Avenida Paraná, no Centro.", "region_id": 1}
    ]
}

def get_regions():
    """Retorna todas as regiões/bairros de Ivaiporã"""
    return DATABASE["regions"]

def get_region(region_id):
    """Retorna uma região/bairro por ID"""
    for region in DATABASE["regions"]:
        if region["id"] == region_id:
            return region
    return None

def get_attractions():
    """Retorna todas as atrações"""
    return DATABASE["attractions"]

def get_attraction(attr_id):
    """Retorna uma atração por ID"""
    for attr in DATABASE["attractions"]:
        if attr["id"] == attr_id:
            return attr
    return None

def add_region(name, info):
    """Adiciona uma nova região/bairro"""
    new_id = max([r["id"] for r in DATABASE["regions"]], default=0) + 1
    region = {"id": new_id, "name": name, "info": info}
    DATABASE["regions"].append(region)
    return region

def add_attraction(name, desc, region_id=1):
    """Adiciona uma nova atração"""
    new_id = max([a["id"] for a in DATABASE["attractions"]], default=0) + 1
    attr = {"id": new_id, "name": name, "desc": desc, "region_id": region_id}
    DATABASE["attractions"].append(attr)
    return attr

def delete_region(region_id):
    """Deleta uma região/bairro"""
    DATABASE["regions"] = [r for r in DATABASE["regions"] if r["id"] != region_id]

def delete_attraction(attr_id):
    """Deleta uma atração"""
    DATABASE["attractions"] = [a for a in DATABASE["attractions"] if a["id"] != attr_id]

if __name__ == "__main__":
    print("Backend API — Ivaiporã Turismo")
    print(f"Total de regiões/bairros: {len(get_regions())}")
    print(f"Total de atrações: {len(get_attractions())}")

