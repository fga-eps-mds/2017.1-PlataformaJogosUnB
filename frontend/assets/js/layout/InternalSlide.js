import React from "react";
import ImageGallery from "react-image-gallery";
require("style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss");
// https://github.com/xiaolin/react-image-gallery

export default class InternalSlide extends React.Component {

    handleImageLoad (event) {

        console.log("Image loaded ", event.target);

    }
    render () {

        const images = this.props.data.media_image.map((slide) => ({
            "original": slide.image,
            "thumbnail": slide.image
        }));

        return (
            <ImageGallery
                items={images}
                slideInterval={2000}
                onImageLoad={this.handleImageLoad}
                slideOnThumbnailHover
                autoplay
                showPlayButton={false}
            />
        );

    }
}
