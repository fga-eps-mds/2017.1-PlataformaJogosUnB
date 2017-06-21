import React, {PropTypes} from "react";
import ImageGallery from "react-image-gallery";
import imageUnavailable from '../../../public/bundles/images/imgIndisponivel.png'
require("react-image-gallery/styles/scss/image-gallery.scss");
// https://github.com/xiaolin/react-image-gallery

export default class InternalSlide extends React.Component {

    handleImageLoad (event) {
        console.log("Image loaded ", event.target);
    }
    getImagesSlide(media_image){
        const images = media_image.map((slide) => ({
            "original": slide.image,
            "thumbnail": slide.image
        }));

        if (images!=[]) {
            return images;
        }

        return ["original": imageUnavailable];
    }


    render () {
        return (
            <ImageGallery
                items={this.getImagesSlide(this.props.media_image)}
                slideInterval={2000}
                onImageLoad={this.handleImageLoad}
                slideOnThumbnailHover
                autoplay
                showPlayButton={false}
            />
        );
    }
}

InternalSlide.propTypes = {
    media_image: PropTypes.string.isRequired,
}
