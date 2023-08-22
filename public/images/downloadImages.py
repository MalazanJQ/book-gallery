import requests
import json
import os

GOOGLE_BOOKS_FIND_ID = 'https://www.googleapis.com/books/v1/volumes?q={}'
GOOGLE_BOOKS_COVER_URL = 'http://books.google.com/books/content?id={}&printsec=frontcover&img=1'

def get_id_from_title(title):
    response = requests.get(GOOGLE_BOOKS_FIND_ID.format(title))
    if response.status_code == 200:
        data = response.json()
        return data['items'][0]['id'] #returns the Google books ID
    return None


def download_book_cover(id, title):
    cover_url = GOOGLE_BOOKS_COVER_URL.format(id)
    response = requests.get(cover_url)
    
    if response.status_code == 200:
        try:
            with open(f'{title}.jpg', 'wb') as f:
                f.write(response.content)
            print(f"Cover downloaded as {title}.jpg")
        except IOError as e:
            print(f"Failed to save the cover for book: {title}")
    else:
        print(f"Failed to download cover for book: {title}")


if __name__ == '__main__':
    json_filepath = '../data/booksList.json'

    with open(json_filepath, 'r') as file:
        document = file.read()

    data = json.loads(document)
    
    for book in data:
        title = book['title']
        if not os.path.exists(f'{title}.jpg'): #checks to see if book cover image is already in folder
            id = get_id_from_title(title)
            if id:
                download_book_cover(id, title)
            else:
                print(f"ID not found for the title: {title}")