import Slider from 'react-slick';
import React from "react";
import {Card,Label,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
require("react-image-gallery/styles/scss/image-gallery.scss");
import {gameListApi} from '../resource/GameApi';

const imageStyle = {
    "height": "100%",
    "width":"70%",
    "float":"left"
}, carouselImageStyle = {
    "background": "#000000",
    "minHeight": "400px",
    "position": "relative",
    "margin":10,
}, cardStyle = {
    "float":"right",
    "height":400,
    "width":"30%" 
},
sliderStyle = {
    "position":"relative",
    "height":400,
    "width":1110
},
textStyle = {
    "textAlign":"justify",
    "top":"42%",
    "position":"absolute",
    "fontSize":"200%"
};

export default class IndexSlider extends React.Component {

    constructor (props) {

        super(props);
        this.state = {"games": []};

    }

    componentWillMount () {

      gameListApi((games) => { this.setState({games}) });

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

    getGenreByGame(id){
        

        return this.state.games[id].information.genres.map((genre) =>{
                    return (<Label color='teal'>
                               {genre.name}
                            </Label>);})
    }

    mountImages(){
       const images = [], imagesSlide = 9;

        for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){

            var image =
                (<div style={sliderStyle}>  
                    <Link to={`/games/${this.state.games[idx].pk}/${this.state.games[idx].name}`}                
                         params={{"id": this.state.games[idx].pk}}
                    >

                        <img
                           src={this.state.games[idx].slide_image} style={imageStyle}
                        />
       
                        <div style={cardStyle}>
                            <Card fluid style={{height:400}}>
                                <Card.Content>
                                    <Card.Header style={textStyle}>{this.state.games[idx].name}</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    {this.getGenreByGame(idx)}
                                </Card.Content> 
                                <Card.Content extra>
                                    <Icon bordered className="linux" />Linux > Windows</Card.Content>
                            </Card>
                        </div> 
                    </Link>
                </div>)
           images.push(image);
        }

        return images;
    }

}
