import React from "react";
import PropTypes from "prop-types";
import {Container} from 'semantic-ui-react';
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

    getImageOrVideo(media,option){
        if (option==='image') {
            return (
                <div key={media.slide}>
                     <img src={media.slide} />
                </div>
            )
        } else  if (option==='video'){
            return (
                <div key={media.video}>
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
        return medias
    }

    getMedias(videos_game, images_game){
        var videos = this.makeElementForSlide(videos_game,'video');
        var images = this.makeElementForSlide(images_game,'image');

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
        if(mediaList){
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

InternalSlide.propTypes = {
    media_video: PropTypes.array.isRequired,
    media_image: PropTypes.array.isRequired,
}
