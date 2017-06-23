import React, {PropTypes} from 'react';
import GameCard from "../components/cards/GameCard";
import { dataListApi } from '../resources/DataListApi';
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { Grid, Dimmer, Loader } from 'semantic-ui-react'
require("slick-carousel/slick/slick.css");
require("slick-carousel/slick/slick-theme.css");


const slideHeight = {
  "height": "280px",
  "position":"relative",
  "minHeight":"180px",
};


export default class GenreSlide extends React.Component {
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

  reducePlatforms(packages){
      let platforms = [];
      if (packages !== undefined) {
          platforms = _.reduce(packages, (platform, bpackage) => { 
              const platform_icons = _.map(bpackage.platforms, (platform_param) => platform_param.icon);
              return platform.concat(platform_icons);
          }, []);
      }
      return _.uniq(platforms);
  }


  render() {
    const gameCards = this.mountCards();

    const settings = {
      dots: true,
      centerMode: true,
      infinite: true,
      speed: 500,
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
        <Dimmer active={this.state.hasLoading}>
            <Loader size='massive'>Loading</Loader>
        </Dimmer>

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
               (<div>
                  <Link to={"games/" + this.state.games[i].pk + "/" + this.state.games[i].name}>
                    <GameCard game={this.state.games[i]} reducePlatforms={this.reducePlatforms} />
                  </Link>
                </div>)
       gameCards.push(image);

    }

    return gameCards;

  }
}

GenreSlide.propTypes = {
  url: PropTypes.string.isRequired
}
