import Slider from 'react-slick';
import React, {PropTypes} from "react";
import {Card, Label, Container} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import imageUnavailable from '../../../public/bundles/images/imgIndisponivel.png'
var Carousel = require('react-responsive-carousel').Carousel;
require("react-responsive-carousel/lib/styles/carousel.css");
// https://github.com/leandrowd/react-responsive-carousel

const slideHeight = {
  "maxHeight": "400px",
  "margin": "5% 5% 8%",
  "width": "90%"
};

const maxHeightImage = {
  "maxHeight": "380px",
};


export default class InternalSlide extends React.Component {

    getMedia(game_videos,game_images){
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

    getImageOrVideo(media,option){
        if (option==='image') {
            return (
                <div>
                     <img src={media.slide} />
                </div>
            )
        } else  if (option==='video'){
            return (
                <div>
                    <video controls style={slideHeight} src={media.video} />
                </div>
            )  
        }
    }

    makeElementForSlide(medias_game, option){
        var medias = [];
        if(typeof medias_game !== undefined){
            medias = medias_game.map( (single_media) => 
                this.getImageOrVideo(single_media, option))
        }
        console.log(medias)
        return medias
    }

    getMedias(videos_game, images_game){
        var videos = this.makeElementForSlide(videos_game,'video');
        var images = this.makeElementForSlide(images_game,'image');

        console.log(images.concat(videos))

        return images.concat(videos)
    }

    componentWillMount(){
        this.getMedias(this.props.media_video,this.props.media_image);
    }
    componentDidMount(){
        this.getMedias(this.props.media_video,this.props.media_image);
    }

    render () {
    const mediaList = this.getMedias(this.props.media_video,this.props.media_image);
        if(!mediaList){
            return (
                <Carousel
                  emulateTouch={true}
                  showStatus={false}
                  dynamicHeight={false}
                >
                {mediaList}
                </Carousel>
            );
        }
        else {
            return (
                <Container style={maxHeightImage}>
                    <img src={imageUnavailable} width='100%' height='100%'/>
                </Container>
            )
        }
   }
}
