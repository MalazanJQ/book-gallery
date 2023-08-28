import json
import requests

def add_key(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    for item in data:
        if "query" not in item:
            url = f"https://www.googleapis.com/books/v1/volumes/?q={item['title']}"
            response = requests.get(url)
            response_json = response.json()
            book_data = response_json.get('items', [])
            if book_data:
                item["id"] = book_data[0].get('id')
    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    filename = input("Enter the path to the JSON file: ")
    add_key(filename)
    print("JSON file updated!")