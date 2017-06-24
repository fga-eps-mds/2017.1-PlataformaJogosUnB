import React from 'react';
import GenreSlide from '../../assets/js/layout/GenreSlide';
import GameCard from "../../assets/js/components/cards/GameCard";
import { Grid } from 'semantic-ui-react';
import Slider from 'react-slick'
import renderer from 'react-test-renderer';



test('Test render GenreSlide', () => {
  const component = renderer.create(

        <div height="280px" position="relative" minHeight="180px">
          <Grid.Column>
          <Slider dots={true}>
            ['card1', 'card2']
          </Slider>
          </Grid.Column>
        </div>
      );


  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
