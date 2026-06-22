"""
API Backend — App Paraná
Simples API em Python para gerenciar dados (quando integrado com banco de dados)
"""

import json
from datetime import datetime

# Banco de dados simulado (em memória)
# Em produção, usar Firebase, PostgreSQL, MongoDB, etc.
DATABASE = {
    "cities": [
        {"id": 1, "name": "Curitiba", "info": "Capital do Paraná, parques e cultura rica."},
        {"id": 2, "name": "Foz do Iguaçu", "info": "Cataratas e usina de Itaipu."},
        {"id": 3, "name": "Londrina", "info": "Segunda maior cidade, industrializada e com universidades."},
        {"id": 4, "name": "Maringá", "info": "Cidade com bom planejamento urbano e foco em educação."},
        {"id": 5, "name": "Ponta Grossa", "info": "Importante polo industrial e educacional do sul paranaense."},
        {"id": 6, "name": "Cascavel", "info": "Maior cidade do oeste do Paraná, região agrícola próspera."},
        {"id": 7, "name": "Apucarana", "info": "Cidade dinâmica do interior, comércio e indústria textil."},
        {"id": 8, "name": "União da Vitória", "info": "Histórica cidade no vale do Iguazu, turismo e natureza."},
    ],
    "attractions": [
        {"id": 1, "name": "Parque Nacional do Iguaçu", "desc": "Cataratas do Iguaçu."},
        {"id": 2, "name": "Jardim Botânico de Curitiba", "desc": "Estufa e jardins bem cuidados."},
    ]
}

def get_cities():
    """Retorna todas as cidades"""
    return DATABASE["cities"]

def get_city(city_id):
    """Retorna uma cidade por ID"""
    for city in DATABASE["cities"]:
        if city["id"] == city_id:
            return city
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

def add_city(name, info):
    """Adiciona uma nova cidade"""
    new_id = max([c["id"] for c in DATABASE["cities"]], default=0) + 1
    city = {"id": new_id, "name": name, "info": info}
    DATABASE["cities"].append(city)
    return city

def add_attraction(name, desc):
    """Adiciona uma nova atração"""
    new_id = max([a["id"] for a in DATABASE["attractions"]], default=0) + 1
    attr = {"id": new_id, "name": name, "desc": desc}
    DATABASE["attractions"].append(attr)
    return attr

def delete_city(city_id):
    """Deleta uma cidade"""
    DATABASE["cities"] = [c for c in DATABASE["cities"] if c["id"] != city_id]

def delete_attraction(attr_id):
    """Deleta uma atração"""
    DATABASE["attractions"] = [a for a in DATABASE["attractions"] if a["id"] != attr_id]

if __name__ == "__main__":
    print("Backend API — App Paraná")
    print(f"Total de cidades: {len(get_cities())}")
    print(f"Total de atrações: {len(get_attractions())}")
