import csv
import json
import os

base_dir = os.path.dirname(os.path.abspath(__file__))  # carpeta donde está el script
csv_path = os.path.join(base_dir, "../data/electricity-data.csv")
json_path = os.path.join(base_dir, "../public/electricity-data.json")

data = []

with open(csv_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        row['consumo_kwh'] = float(row['consumo_kwh'])
        data.append(row)

with open(json_path, "w", encoding='utf-8') as jsonfile:
    json.dump(data, jsonfile, indent=2, ensure_ascii=False)

print(f"Archivo generado: {json_path}")
