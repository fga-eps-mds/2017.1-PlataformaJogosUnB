import React from 'react';
import Slider from 'react-slick';
import GameCard from "../components/cards/GameCard";
import { gameListApi } from '../resource/GameApi';
import { Link } from 'react-router-dom'
import { Container, Grid } from 'semantic-ui-react'

const CardSlideStyle = {
  "position":"relative",
  "minHeight":"180px",
}

const slideHeight = {
    "height": "28px",
};


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
      <div style={slideHeight}>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <Grid.Column>
        <h2>Center Mode</h2>
        <Slider {...settings}>
          {gameCards}
        </Slider>
        </Grid.Column>
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
}
