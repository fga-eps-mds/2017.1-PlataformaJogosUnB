import "style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss";
import Slider from 'react-slick';
import React from "react";
import InfiniteCarousel from "react-leaf-carousel";
import GameCard from "../components/cards/GameCard";
import {Card} from 'semantic-ui-react';
const imageStyle = {
    "height": 400,
    "width" : "100%",
    "margin": "auto",
    "display":"block",
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
      lazyLoad:true,
      infinite: true,
    autoplay: true,
      autoPlaySpeed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
        initialSlide:2
    };


if(images.length){

    return (<div style={imageStyle}>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
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
                   (<div>
                            <img
                               src={this.state.games[idx].slide_image} style={imageStyle}/>

                        </div>)
           images.push(image);
         image =<div style={{position:"relative"}}>    <div ><Card fluid style={{height:200,width:"99%"}}><Card.Content><Card.Header>Jogo Bolado</Card.Header><Card.Description>Esse jogo é muito bolado</Card.Description></Card.Content></Card> </div>

<div ><Card fluid style={{bottom:0,height:200,width:"99%",position:"absolute"}}><Card.Content><Card.Header>Você deveria jogar esse jogo. Por que?????</Card.Header><Card.Description>Ué, porque esse jogo é muito bolado</Card.Description></Card.Content></Card> </div>

</div>

           images.push(image);

        }
        return images;
    }

}
