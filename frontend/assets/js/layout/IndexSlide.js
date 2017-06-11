import "style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss";
import Slider from 'react-slick';
import React from "react";
import InfiniteCarousel from "react-leaf-carousel";
import "style-loader!css-loader!sass-loader!slick-carousel/slick/slick.css"
import GameCard from "../components/cards/GameCard";
import {Card} from 'semantic-ui-react';
const imageStyle = {
    "height": 400,
    "margin": "auto",
    "display":"block",
    "maxWidth":"100%",
    "minWidth":"100%",
    "width":"100%"
}, carouselImageStyle = {
    "background": "#000000",
    "minHeight": "400px",
    "position": "relative",
};
export default class IndexSlider extends React.Component {

    constructor (props) {

        super(props);
        this.state = {"games": []};

    }

    componentWillMount () {

        this.loadGameFromServer();

    }

    loadGameFromServer () {

        fetch("/api/list/",
            {
                "headers": new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((games) => {

              this.setState({games});

          });

    }



    render () {
        const images = this.mountImages();

var settings = {
     dots: true,
      infinite: true,
fade:true,
    autoplay: true,
      autoPlaySpeed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
        initialSlide:1,
variableWidth: true
    };


if(images.length){

    return (<div style={imageStyle}>
      <Slider {...settings}>{images}
      </Slider></div>
            );
        }else{
            return <img/>
        }
    }


    mountImages(){
       const images = [], imagesSlide = 9;

        for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){
            var image =
                   (<div style={{width:789}}>
                            <img
                               src={this.state.games[idx].slide_image} />

                        </div>)
           images.push(image);
         image =<div style={{width:338}}>    <div ><Card fluid ><Card.Content><Card.Header>Jogo Bolado</Card.Header><Card.Description>Esse jogo é muito bolado</Card.Description></Card.Content></Card> </div>


</div>

           images.push(image);

        }
        return images;
    }

}
