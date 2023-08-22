import PhotoAlbum from "react-photo-album";

const imageContext = require.context('../images', false, /\.jpg$/);

const images = imageContext.keys().map(imageContext);

const photos = images.map(src => ({
    src,
    width: 575, 
    height: 900
}));

export default function Gallery() {
    return <PhotoAlbum layout="rows" photos={photos} />;
}