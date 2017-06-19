import Slider from 'react-slick';
import React, {PropTypes} from "react";
import {Card,Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
require("react-image-gallery/styles/scss/image-gallery.scss");
import {gameListApi} from '../resource/GameApi';

const imageStyle = {
    "height": "100%",
    "width":"100%",
    "float":"left"
}, carouselImageStyle = {
    "background": "#000000",
    "minHeight": "400px",
    "position": "relative",
    "margin":10,
    "margin-top":0,
}, sliderStyle = {
    "position":"relative",
    "height":400,
    "width":1110
};

export default class InternalSlide extends React.Component {

    constructor (props) {
        super(props);

    }

    render () {
        const images = this.mountImages();

        var settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            fade: true,
            autoPlaySpeed: 4200,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide:1
        };

        if(images.length){
            return (<div style={carouselImageStyle}>
                <Slider {...settings}>{images}
                </Slider></div>
            );
        } else {
            return <img/>
        }
    }

    mountImages(){
       const images = [], imagesSlide = 9;

        for(var idx=0; idx < imagesSlide && idx < this.props.media_image.length; idx+=1){

            var image =
                (<div style={sliderStyle}>  
                    <img
                       src={this.props.media_image[idx].slide} style={imageStyle}
                    />
                </div>)
           images.push(image);
        }

        return images;
    }

}

InternalSlide.propTypes = {
    media_image: PropTypes.string.isRequired,
}
