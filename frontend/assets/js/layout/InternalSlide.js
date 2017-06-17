import Slider from 'react-slick';
import React, {PropTypes} from "react";
import Slider from 'react-slick';
import imageUnavailable from '../../../public/bundles/images/imgIndisponivel.png'
import { Grid } from 'semantic-ui-react'


const CardSlideStyle = {
  "position":"relative",
  "minHeight":"180px",
}

const slideHeight = {
    "height": "280px",
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
    getImagesSlide(media_image){
        const images = media_image.map((slide) => ({
            slide.image
        }));

        if (images!=[]) {
            return images;
        }

        return ['imageUnavailable'];
    }

    render () {
      const settings = {
       dots: true,
       lazyLoad: true,
       infinite: true,
       speed: 500,
       slidesToShow: 3,
       slidesToScroll: 1,
       initialSlide: 3
     };
     if(this.props.media_image){
        return (
          <div style={slideHeight}>
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
          <Grid.Column>
          <Slider {...settings}>
            {this.getImagesSlide(this.props.media_image)}
            </Slider>
            </Grid.Column>
          </div>
    );
    }else{
      return false;
    }
  }
}
