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

    getMedias(game_videos,game_images){
        if(typeof game_videos !== undefined){
        var videos = [];
        videos = game_videos.map( (single_video) =>
          <div>
            <video controls style={slideHeight} src={single_video.video} />
          </div>)
        }
        if(typeof game_images !== undefined){
        var images = [];
         images = game_images.map( (single_image) =>
           <div>
             <img src={single_image.slide} />
           </div>
         )
        }
        return videos.concat(images)
    }


    componentWillMount(){
        this.getMedias(this.props.media_video,this.props.media_image);
    }
    componentDidMount(){
        this.getMedias(this.props.media_video,this.props.media_image);
    }

    render () {
    const mediaList = this.getMedias(this.props.media_video,this.props.media_image)
        if(mediaList){
        return (
            <Carousel
              emulateTouch={true}
              showStatus={false}
            >
            {mediaList}
            </Carousel>
        );
        }
        return false
   }
}
