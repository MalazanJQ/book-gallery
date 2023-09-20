import axios from 'axios';

const FetchBookData = async (id) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
    const MAX_RETRIES = 3;
    let retries = 0;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    while (retries < MAX_RETRIES) {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}&key${API_KEY}`);
            const data = response.data.volumeInfo;
            return {
                author: data.authors,
                pages: data.pageCount,
                summary: data.description
            };  

        } catch (error) {
            if (error.response && error.response.status === 429) {
                return { error: "Rate limit exceeded" };
            }
            retries++;
            await delay(1000);
        }
    }

    return { error: "Unable to acquire data" };

};

export default FetchBookData;