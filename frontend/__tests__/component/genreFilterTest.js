import React from 'react';
import GenreFilter from '../../assets/js/pages/GenreFilter';
import {Segment, Grid, Container} from "semantic-ui-react";
import GameCard from "../../assets/js/components/cards/GameCard";
import renderer from 'react-test-renderer';

test('Test render GenreFilter', () => {
  const component = renderer.create(
      <Container>
          <Segment padded inverted color="brown">
              <h1>Jogos de "acao"</h1>
          </Segment>

          <Grid doubling columns={5}>
              ['game1', 'game2', 'game3']
          </Grid>
      </Container>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
