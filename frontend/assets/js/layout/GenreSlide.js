import React from 'react';
import Slider from 'react-slick'
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");
import GameCard from "../components/cards/GameCard";
import {gameListApi} from '../resource/GameApi';
import {Link} from 'react-router-dom'
export default class GenreSlide extends React.Component {
  constructor (props) {

      super(props);
      this.state = {"games": []};
  }

  componentWillMount () {

      gameListApi((games) => { this.setState({games}) });

  }

  render() {
    const gameCards = this.mountImages();

    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 3
    };
    if(gameCards.length){
    return (
      <div>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          {gameCards}
        </Slider>
      </div>
    );
    }else{
      return <img/>
    }
  }
  mountImages(){
   const gameCards = [], imagesSlide = 6;
    for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){
      {console.log(this.state.games[idx].pk)}
        const image =
               (<div>
                  <Link to={"games/" + this.state.games[idx].pk}>
                    <GameCard data={this.state.games[idx]} />
                  </Link>
                </div>)
       gameCards.push(image);
    
    }
    return gameCards;
  }
}
