import React from "react";
import ReactDOM from "react-dom";
import ImageGallery from "react-image-gallery";

require("style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss");

const Carousel = require("nuka-carousel");

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

                    images.push(<img src={game.cover_image} height="400" />);

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
