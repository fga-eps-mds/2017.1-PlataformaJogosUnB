import React from "react";
import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";

require("style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss");

const Carousel = require("nuka-carousel");

const imageStyle = {
  position: 'absolute',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%'
}

const carouselImageStyle = {
  background: '#000000',
  minHeight: '400px',
  position: 'relative',
}

export default class IndexSlider extends React.Component {

    constructor (props) {

        super(props);
        this.state = {"games": []};

    }

    loadGameFromServer () {

        fetch("/api/list/",
            {
                "headers": new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((games) => {

              this.setState({games});

          }).
          catch((error) => {

              console.error(error);

          });

    }

    componentWillMount () {

        this.loadGameFromServer();

    }
    handleImageLoad (event) {

        console.log("Image loaded ", event.target);

    }

    render () {

        const images = [];
        const imgsInSlide = 4;
        let countImgsInSlide = 0;

        this.state.games.map((game) => {

            if (game.cover_image !== "undefined" && countImgsInSlide <= imgsInSlide) {

                {
                    var image = (
                        <div style={carouselImageStyle}>
                            <img src={game.slide_image} style={imageStyle} />
                        </div>
                    )
                    images.push(image);

                }
                countImgsInSlide++;

            }

        });

        return (
            <Carousel>
                {images}
            </Carousel>
        );

    }

}
