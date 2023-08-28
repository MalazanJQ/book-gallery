import axios from 'axios';
import books from '../data/testList.json';

const FetchBookData = async (id) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (true) {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const data = response.data.volumeInfo;
            return {
                author: data.authors,
                pages: data.pageCount,
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

export default FetchBookData;