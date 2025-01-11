import csv
import json

data = {}

with open('data.csv', 'r') as f:
    reader = csv.reader(f, delimiter=';')
    for row in reader:
        id, descripcion, grupo, precio = row

        if grupo not in data:
            data[grupo] = {}

        data[grupo][descripcion] = precio


with open('src/ouput.json', 'w', encoding='utf-8') as outfile_json:
    json.dump(data, outfile_json, indent=4, ensure_ascii=False)

print(json.dumps(data, indent=4, ensure_ascii=False))