import json
import requests

def add_book(year):
    while year.lower() != "quit":
        file = f"C:\Users\shini\OneDrive\Github\book-gallery\src\data\{year}.json"
        with open(file, 'r') as file:
            data = json.load(file)        
            title = input("Enter the book title")
            url = f"https://www.googleapis.com/books/v1/volumes/?q={item['title']}"

            response = requests.get(url)
            response_json = response.json()
            book_data = response_json.get('items', [])

            index = 0

            print

            correct = input("Is this the correct book?")

            while correct.lower() != "yes":

            
            data.append
        with open(file, 'w') as file:
            json.dump(data, file, indent=4)

if __name__ == "__main__":
    year = input("Enter the year or 'Currently Reading' to add a book to your book list")
    add_book(year)
    print("JSON file updated!")