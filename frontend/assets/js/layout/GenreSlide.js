import React from 'react';
import Slider from 'react-slick'
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
import GameCard from "../components/cards/GameCard";

export default class GenreSlide extends React.Component {
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
  render() {
    const images = this.mountImages();

    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 3
    };
    if(images.length){
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          {images}
        </Slider>
      </div>
    );
  }else{
    return <img/>
  }
  }
  mountImages(){
   const images = [], imagesSlide = 6;
    for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){
        const image =
               (<div>
                        <GameCard data={this.state.games[idx]} />
                </div>)
       images.push(image);
    
    }
    return images;
  }
}
