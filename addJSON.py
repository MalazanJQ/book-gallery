import json

def add_image_key(json_file):
    with open(json_file, 'r') as file:
        data = json.load(file)
    
    for item in data:
        title_with_underscores = item['title'].replace(' ', '_')
        item['image'] = f"/images/{title_with_underscores}.jpg"

    with open(json_file, 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    json_filename = input("Enter the path to the JSON file: ")
    add_image_key(json_filename)
    print("JSON file updated!")