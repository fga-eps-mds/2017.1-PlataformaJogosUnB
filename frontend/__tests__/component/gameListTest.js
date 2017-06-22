import React from 'react';
import GameList from '../../assets/js/components/GameList';
import {Card, Grid} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render GameList', () => {
  const component = renderer.create(
      <Grid doubling columns={5}>
          ['game1','game2','game3']
      </Grid>
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
