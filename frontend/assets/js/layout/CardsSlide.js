import React from 'react';
import PropTypes from "prop-types";
import Slider from 'react-slick'
import GameCard from "../components/cards/GameCard";
import LoadingAnimation from "../layout/LoadingAnimation";
import { dataListApi } from '../resources/DataListApi';
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");

const slideHeight = {
  "height": "320px",
  "position":"relative",
  "minHeight":"180px",
  "margin":20
};

export default class CardsSlide extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        "games": [],
        "hasLoading": true
      };
  }

  componentWillMount () {
      dataListApi(this.props.url, (games) => {
        this.setState({games})
        if ((games).length > 0) {
            this.setState({hasLoading: false})
        }
      });
  }

  render() {
    const gameCards = this.mountCards();

    const settings = {
      dots: true,
      centerMode: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
      {
        breakpoint: 980,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
    };
    if(gameCards.length){
      return (
        <div style={slideHeight}>
          <LoadingAnimation hasLoading={this.state.hasLoading} />
          <Grid.Column>
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
    for(var i=0; i < cardsAmount && i < this.state.games.length - 1; i++){
        const image =
               (<div key={this.state.games[i].pk}>
                  <Link to={"games/" + this.state.games[i].pk + "/" + this.state.games[i].name}>
                    <GameCard game={this.state.games[i]} />
                  </Link>
                </div>)
        gameCards.push(image);
    }
    return gameCards;
  }
}

CardsSlide.propTypes = {
    url: PropTypes.string.isRequired
}
