import React from "react";
import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";
require("style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss");
// https://github.com/xiaolin/react-image-gallery

export default class InternalSlide extends React.Component {

    handleImageLoad (event) {

        console.log("Image loaded ", event.target);

    }

    render () {

        const images = [
            {
                "original": "http://lorempixel.com/1000/600/nature/1/",
                "thumbnail": "http://lorempixel.com/250/150/nature/1/"
            },
            {
                "original": "http://lorempixel.com/1000/600/nature/2/",
                "thumbnail": "http://lorempixel.com/250/150/nature/2/"
            },
            {
                "original": "http://lorempixel.com/1000/600/nature/3/",
                "thumbnail": "http://lorempixel.com/250/150/nature/3/"
            }
        ];


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
