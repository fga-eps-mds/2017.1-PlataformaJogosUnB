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

    componentDidMount () {

        this.loadGameFromServer();

    }
    handleImageLoad (event) {

        console.log("Image loaded ", event.target);

    }

    render () {

        const temp = [];
        let temps;
        const imgs = [];
        var gameCards = gameCards = this.state.games.map((game) => {

            for (let i = 0; i < game.media_image.length; i++) {

                if (game.media_image[i].role === "slider") {

                    {

                        temp.push(game.media_image[i].image);

                    }

                }

            }

        });

        temps = temp.map((image) =>
            imgs.push(<img src={image} />
          ));
        {

            console.log(temp[0]);

        }

        return (
            <Carousel>
                {imgs}
            </Carousel>
        );

    }
}
