import Slider from 'react-slick';
import React from "react";
import {Card, Dimmer, Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
require("react-image-gallery/styles/scss/image-gallery.scss");
import {dataListApi} from '../resources/DataListApi';
import {getKernel} from "../resources/getKernel"
import {mountGenresTags, mountIcons} from "../resources/mountGenresTags"

const imageStyle = {
    "height": "100%",
    "width":"70%",
    "float":"left"
}, carouselImageStyle = {
    "background": "#000000",
    "minHeight": "400px",
    "position": "relative",
    "margin":20,
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
        this.state = {
            "games": [],
            "hasLoading": true
        };

    }

    componentWillMount () {

        dataListApi("/api/games/", (games) => { 
            this.setState({games})
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
                <div style={carouselImageStyle}>
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

    mountImages(){
       const images = [], imagesSlide = 9;

        for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){
            var image =
                (<div style={sliderStyle} key={this.state.games[idx].pk}>
                    <Link to={`/games/${this.state.games[idx].pk}/${this.state.games[idx].name}`}>
                        <img
                           src={this.state.games[idx].slide_image} style={imageStyle}
                        />

                        <div style={cardStyle}>
                            <Card fluid style={{height:400}}>
                                <Card.Content>
                                    <Card.Header style={textStyle}>{this.state.games[idx].name}</Card.Header>
                                </Card.Content>
                                <Card.Content extra>
                                    {mountGenresTags(this.state.games[idx].information.genres)}
                                </Card.Content>
                                <Card.Content extra>
                                    {mountIcons(getKernel(this.state.games[idx].packages))}
                                </Card.Content>
                            </Card>
                        </div>
                    </Link>
                </div>)
           images.push(image);
        }

        return images;
    }

} 
    
