import Slider from 'react-slick';
import React from "react";
import {Card, Label, Icon, Dimmer, Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
require("react-image-gallery/styles/scss/image-gallery.scss");
import {dataListApi} from '../resources/DataListApi';
import {imageStyleIndexSlide, carouselImageStyleIndexSlide, cardStyleIndexSlide, sliderStyleIndexSlide, textStyleIndexSlide} from "../resources/styleConstants";

export default class IndexSlider extends React.Component {

    constructor (props) {

        super(props);
        this.state = {
            "games": [],
            "hasLoading": true
        };

    }

    componentWillMount () {

        dataListApi("/api/games/", (games) => {
            this.setState({games})
            console.log(games)
            if ((games).length > 0) {
                this.setState({hasLoading: false})
            }
        });

    }

    render () {
        const images = this.mountImages();

        var settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            autoPlaySpeed: 4200,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide:1
        };


        if(images.length){
            return (
                <div style={carouselImageStyleIndexSlide}>
                    <Dimmer active={this.state.hasLoading}>
                        <Loader size='massive'>Loading</Loader>
                    </Dimmer>

                    <Slider {...settings}>
                        {images}
                    </Slider>
                </div>
            );
        } else {
            return <img/>
        }
    }

    getGenreByGame(id){

        return this.state.games[id].information.genres.map((genre) =>{
                    return (<Link to={`/games/${genre.name}`} >
                            <Label color='teal'>
                               {genre.name}
                            </Label></Link>);})
    }

    mountImages(){
       const images = [], imagesSlide = 9;

        for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){

            var image =
                (<div style={sliderStyleIndexSlide}>
                    <Link to={`/games/${this.state.games[idx].pk}/${this.state.games[idx].name}`}>

                        <img
                           src={this.state.games[idx].slide_image} style={imageStyleIndexSlide}
                        />

                        <div style={cardStyleIndexSlide}>
                            <Card fluid style={{height:400}}>
                                <Card.Content>
                                    <Card.Header style={textStyleIndexSlide}>{this.state.games[idx].name}</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    {this.getGenreByGame(idx)}
                                </Card.Content>
                                <Card.Content extra>
                                    <Icon bordered className="linux" />Linux / Windows</Card.Content>
                            </Card>
                        </div>
                    </Link>
                </div>)
           images.push(image);
        }

        return images;
    }

}
