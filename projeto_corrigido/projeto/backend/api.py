"""
API Backend — Ivaiporã Turismo
Simples API em Python para gerenciar dados de Ivaiporã (quando integrado com banco de dados)
"""

import json
from datetime import datetime

# Banco de dados simulado (em memória) focado em Ivaiporã
DATABASE = {
    "regions": [
        {"id": 1, "name": "Centro", "info": "Coração comercial de Ivaiporã, com praças, lojas, restaurantes e cafeterias tradicionais."},
        {"id": 2, "name": "Distrito de Jacutinga", "info": "Área de forte presença histórica, imigração e rotas de turismo rural."},
        {"id": 3, "name": "Distrito de Alto Porã", "info": "Região serrana com belas vistas, cachoeiras e rotas de cicloturismo."},
        {"id": 4, "name": "Jardim Paraná", "info": "Bairro residencial com áreas verdes e proximidade com o campus do IFPR."},
        {"id": 5, "name": "Vila Nova", "info": "Bairro tradicional com eventos locais e forte senso de comunidade."}
    ],
    "attractions": [
        {"id": 1, "name": "Lago de Santana", "desc": "Ótimo ponto para lazer, caminhadas e pesca à beira do lago.", "region_id": 1},
        {"id": 2, "name": "Casa da Memória Vera Vargas (Museu)", "desc": "Espaço cultural dedicado à preservação da história de Ivaiporã.", "region_id": 1},
        {"id": 3, "name": "IFPR - Campus Ivaiporã", "desc": "Instituto Federal com ensino técnico e superior público.", "region_id": 4},
        {"id": 4, "name": "Cachoeira do Rio Bom", "desc": "Cachoeira ideal para banho e contato com a natureza em Alto Porã.", "region_id": 3},
        {"id": 5, "name": "Café do Urso", "desc": "Cafeteria temática com cafés gourmet e ambiente aconchegante no Centro.", "region_id": 1}
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

