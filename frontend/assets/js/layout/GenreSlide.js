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
    const gameCards = this.mountCards();

    this.sortListByYear();

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
  mountCards(){
   const gameCards = [], cardsAmount = 6;
    for(var idx=0; idx < cardsAmount && idx < this.state.games.length; idx+=1){
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
  sortListByYear(){
    const gameList = this.state.games;
    gameList = gameList.map((year) => {
      return year.information.launch_year
    })
    gamelist.sort()
    {console.log(gamelist)}
  }
}
