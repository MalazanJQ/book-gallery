import axios from 'axios';
import books from '../data/booksList.json';

const fetchGBData = async (title) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (true) {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes/?q=${title}&key=${API_KEY}`
            );

            const data = response.data.items[0];

            return {
                author: data.authors[0],
                pages: data.pageCount,
                image: data.imageLinks.thumbnail.replace('&zoom=5&edge=curl&source=gbs_api', ''),
                summary: data.description
            };  
        } catch (error) {
            if (error.response && error.response.status === 429) {
                await delay(1000);
            } else {
                throw error;
            }
        }
    }
};

const fetchBookData = async () => {
    const booksList = [];
    for (let book of books) {
        const nextBook = await fetchGBData(book.title);
        console.log(book.image);
        booksList.push({ ...book, ...nextBook });
    }
    return booksList;
};

export default fetchBookData;