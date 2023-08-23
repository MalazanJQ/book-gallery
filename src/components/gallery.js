import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";

import "yet-another-react-lightbox/styles.css";
import { useState, useEffect } from "react";

import fetchBookData from './bookData.js'

import books from '../data/booksList.json'

const RATING_TO_DIMENSIONS = {
    5: [200, 300],
    4.5: [100, 160],
    4: [200, 300],
    3.5: [100, 160],
    3: [200, 300],
    2.5: [100, 160],
    2: [200, 300],
    1.5: [100, 160],
    1: [200, 300]
};


export default function Gallery() {

    const [index, setIndex] = useState(-1);
    const [bookData, setBookData] = useState({});

    const photos = books.map(book => {
        const dimensions = RATING_TO_DIMENSIONS[book.rating]
        return {
            src: book.image,
            width: dimensions[0],
            height: dimensions[1]
        };
    });

    const lightboxPhotos = photos.map((photo, index) => {
        const data = bookData[index] || {}
        return {
            ...photo,
            width: 575,
            height: 850,
            title: `${books[index].title}${data.author ? ` by ${data.author}` : ''}`,
            summary: `Page count: ${data.pages}\nPersonal rating: ${books[index].rating}\nSummary: ${data.summary}`
        };
    });

    const getData = async (index) => {
        if (!bookData[index]){
            const data = await fetchBookData(books[index].title);
            setBookData(prev => ({ ...prev, [index]: data }));
        }
    };

    return (
        <>
            <PhotoAlbum
                layout="masonry"
                photos={photos}
                onClick={({index}) => {
                    getData(index);
                    setIndex(index);
                }}
            />

            <Lightbox
                plugins={[Captions]}
                slides={lightboxPhotos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                on={{view: ({index}) => {
                    getData(index);
                    setIndex(index);
                }}}
            />
        </>
    );
}