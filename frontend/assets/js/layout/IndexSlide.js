import React from "react";
import Slider from 'react-slick';
import {Card} from 'semantic-ui-react';
import "style-loader!css-loader!sass-loader!slick-carousel/slick/slick.css"
import "style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss";
import {gameListApi} from '../resource/GameApi';

const carouselImageStyle = {
    "background": "#000000",
    "minHeight": "400px",
    "position": "relative",
    "margin":10,
};

export default class IndexSlider extends React.Component {

    constructor (props) {

        super(props);
        this.state = {"games": []};

    }

    componentWillMount () {

      gameListApi((game) => { this.setState({game}) });

    }

    render () {
        const images = this.mountImages();

        var settings = {
            dots: true,
            infinite: true,
            autoplay:true,
            autoPlaySpeed: 4200,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide:1
        };


        if(images.length){

            return (
                <div style={carouselImageStyle}>
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                    <Slider {...settings}>{images}</Slider>
                </div>
            );
        } else {
            return <img/>
        }
    }


    mountImages(){
       const images = [], imagesSlide = 9;

        for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){

            var image =
                (<div style={{position:"relative",height:400}}>
                    <img
                       src={this.state.games[idx].slide_image} style={{margin:"0 auto",float:"left",height:"100%",width:"70%"}}/>

                     <div style={{verticalAlign:"top",float:"right",height:400,width:"30%"}}>
                        <Card fluid style={{height:400}}>
                            <Card.Content>
                                <Card.Header>{this.state.games[idx].name}</Card.Header>
                                    <Card.Description>Esse jogo é muito bolado</Card.Description>   
                            </Card.Content> 
                                <Card.Content extra>
                                    {"Linux > Windows"}
                                </Card.Content>
                        </Card>
                    </div> 
                </div>)
           images.push(image);
        }

        return images;
    }

}
