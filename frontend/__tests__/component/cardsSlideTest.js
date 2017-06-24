import React from 'react';
import CardsSlide from '../../assets/js/layout/CardsSlide';
import GameCard from "../../assets/js/components/cards/GameCard";
import { Grid } from 'semantic-ui-react';
import Slider from 'react-slick'
import renderer from 'react-test-renderer';



test('Test render CardsSlide', () => {
  const className = 'teste'

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
  const component = renderer.create(

        <div height="280px" position="relative" minHeight="180px">
          <Grid.Column>
          <Slider {...settings}>
            [{this.gameCards}]
          </Slider>
          </Grid.Column>
        </div>
      );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
