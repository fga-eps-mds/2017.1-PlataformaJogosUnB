import Slider from 'react-slick';
import React, {PropTypes} from "react";
import {Card,Label} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
var Carousel = require('react-responsive-carousel').Carousel;
require("react-responsive-carousel/lib/styles/carousel.css");
// https://github.com/leandrowd/react-responsive-carousel


const slideHeight = {
  "height": "400px",
  "margin": "5% 5%",
  "width": "90%",
};

export default class InternalSlide extends React.Component {

    getVideos(game_videos){
        var videos = [];
        videos = game_videos.map( (single_video) =>
          <div>
            <video style={slideHeight} src={single_video.video} controls/>
          </div>
        )
        return videos
    }

    getImages(game_images){
        var images = [];
        images = game_images.map( (single_image) => 
          <div>
            <img src={single_image.slide} />
          </div>
        )
        return images
    }


    componentDidMount(){
        this.getVideos(this.props.media_video);
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
                {this.getVideos(this.props.media_video)}
                {this.getImages(this.props.media_image)}
            </Carousel>
        );
    }

}
