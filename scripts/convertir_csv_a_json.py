import csv
import json
from collections import defaultdict
import os

base_dir = os.path.dirname(os.path.abspath(__file__))  # carpeta donde está el script
csv_path = os.path.join(base_dir, "../data/consumo_por_mes.csv")
json_path = os.path.join(base_dir, "../public/consumo_por_mes.json")


# Diccionario temporal para agrupar datos por mes
meses_dict = defaultdict(lambda: {
    "year": 0,
    "consumption": 0,
    "breakdown": []
})

# Leer CSV
with open(csv_path, newline='', encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        mes = row["month"].strip().lower()
        year = int(row["year"])
        consumo = float(row["consumption"])
        categoria = row["category"]
        porcentaje = float(row["percentage"])

        # Usamos (mes, year) como clave
        clave = (mes, year)

        # Si aún no se cargó el consumo, lo guardamos
        if meses_dict[clave]["consumption"] == 0:
            meses_dict[clave]["consumption"] = consumo
            meses_dict[clave]["year"] = year

        # Agregamos categoría al breakdown
        meses_dict[clave]["breakdown"].append({
            "category": categoria,
            "percentage": porcentaje
        })

# Convertir a lista ordenada
resultado = []
for (mes, year), datos in sorted(meses_dict.items(), key=lambda x: x[1]["year"]):
    resultado.append({
        "month": mes,
        "year": year,
        "consumption": datos["consumption"],
        "breakdown": datos["breakdown"]
    })

# Guardar JSON
with open(json_path, "w", encoding="utf-8") as jsonfile:
    json.dump({
        "title": "Huella de Carbono - Campus",
        "data": resultado
    }, jsonfile, indent=2, ensure_ascii=False)

print(f"JSON generado en: {json_path}")
