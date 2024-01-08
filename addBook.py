import os, requests, json
from PIL import Image
import urllib.request

def add_book(year):
    while year.lower() != "quit":
        file = f"C:/Users/shini/OneDrive/Github/book-gallery/src/data/{year}.json"

        with open(file, 'r') as json_file:
            data = json.load(json_file)        
            title = input("Enter the book title\n")
            url = f"https://www.googleapis.com/books/v1/volumes/?q={title}"

            response = requests.get(url)
            response_json = response.json()
            book_data = response_json.get('items', [])

            index = 0
            show_book_details(book_data, index)
            correct = input("Is this the correct book?\n")

            while correct.lower() != "yes":
                index += 1
                show_book_details(book_data, index)
                correct = input("Is this the correct book?\n")

            rating = input(f"What rating would you give {title}?\n")
            official_title = book_data[index]['volumeInfo']['title']
            id = book_data[index]['id']
            image_name = f"./public/images/{official_title.replace(' ', '_')}.jpg"

            data.append({
                "year": year,
                "title": official_title,
                "rating": rating,
                "id": id,
                "image": image_name
                })
            
        year = input("Please enter the year of the next book or type 'quit' to exit.\n")

        with open(file, 'w') as json_file:
            json.dump(data, json_file, indent=4)

def show_book_details(data, index):
    current = data[index]['volumeInfo']
    print("\nHere are the book details...")
    print(current['title'])
    print(current['authors'])

if __name__ == "__main__":
    year = input("Enter the year or 'Currently Reading' to add a book to your book list\n")
    file = f"C:/Users/shini/OneDrive/Github/book-gallery/src/data/{year}.json"
    if not os.path.exists(file):
        if input("Do you want to add the new year " + year + "? ").lower() == "yes":
            file = open(f"C:/Users/shini/OneDrive/Github/book-gallery/src/data/{year}.json", "w")
    add_book(year)
    print("JSON file updated!")