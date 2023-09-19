import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

import DOMPurify from "dompurify";

import { useState, useEffect } from "react";

import FetchBookData from './bookData.js'

export default function CurrentlyReading() {
    const [books, setBooks] = useState([]);
    const [index, setIndex] = useState(-1);
    const [bookData, setBookData] = useState({});

    useEffect(() => {
        import(`../data/current.json`).then(data => {
            setBooks(data.default);
        });
    }, []);

    const photos = books.map(book => {
        return {
            src: book.image,
            width: 200,
            height: 300
        };
    });

    const lightboxPhotos = photos.map((photo, index) => {
        const data = bookData[index] || {};
        const summary = DOMPurify.sanitize(data.summary ? data.summary : '').replace(/<\/?b>/g, (match) => match === '<b>' ? '<i>' : '</i>');
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
                    Personal Rating: To be determined...
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
            <h1>Currently Reading<span>Now reading {books.length} books</span></h1>
            <PhotoAlbum
                layout="masonry"
                photos={photos}
                onClick={({index}) => {
                    getData(index);
                    setIndex(index);
                }}
            />
            
            <Lightbox 
                plugins={[Captions, Counter]}
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