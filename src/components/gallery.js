import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

import DOMPurify from "dompurify";

import { useState, useEffect } from "react";

import FetchBookData from './bookData.js'
import Ratings from './ratings.js'

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


export default function Gallery({ year, count }) {

    const [books, setBooks] = useState([]);
    const [index, setIndex] = useState(-1);
    const [bookData, setBookData] = useState({});

    useEffect(() => {
        import(`../data/${year}.json`).then(data => {
            setBooks(data.default)
            count(year, data.default.length);
        });
    }, [year]);

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
        const summary = DOMPurify.sanitize(data.summary ? data.summary : '').replace(/<\/?b>/g, (match) => match === '<b>' ? '<i>' : '</i>');
        const stars = `/images/${books[index].rating}_stars.svg`;
        return {
            ...photo,
            width: 575,
            height: 850,
            title: `${books[index].title}${data.author ? ` by ${data.author}` : ''}`,
            description: (
                <div
                dangerouslySetInnerHTML={{
                    __html: `
                    Page Count: ${data.pages ? data.pages : ''}
                    <br/><br/>
                    Personal Rating: <img style="filter: grayscale(100%) contrast(800%) brightness(80%)" src=${stars}  width="100" height="20" alt="${books[index.rating]}">
                    <br/><br/>
                    Summary:
                    <br/><br/> ${summary}`
                }}
                />
            )
        };
    });

    //fetch data from google books API once cover image is clicked
    const getData = async (index) => {
        if (!bookData[index]){
            const data = await FetchBookData(books[index].id);
            setBookData(prev => ({ ...prev, [index]: data }));
        }
    };

    //set captions settings
    const [descriptionMaxLines, setDescriptionMaxLines] = useState(50);
    const [showToggle, setShowToggle] = useState(true);

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
                captions={{ showToggle, descriptionMaxLines }}
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