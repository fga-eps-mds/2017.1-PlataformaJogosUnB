import Slider from 'react-slick';
import React, {PropTypes} from "react";
import {Card,Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
var Carousel = require('react-responsive-carousel').Carousel;
require("react-responsive-carousel/lib/styles/carousel.css");
// https://github.com/leandrowd/react-responsive-carousel

export default class InternalSlide extends React.Component {

    getImages(game_images){
        var images = [];
        images = game_images.map( (single_image) => 
          <div>
            <img src={single_image.slide} />
            <p className="legend">Teste</p>
          </div>
        )
        return images
    }

    componentDidMount(){
        this.getImages(this.props.media_image); 
    }

    render () {
        return (
            <Carousel
              infiniteLoop={true}
              emulateTouch={true}
              autoplay={true}
              showStatus={false}
            >
                {this.getImages(this.props.media_image)}
            </Carousel>
        );
    }

}
