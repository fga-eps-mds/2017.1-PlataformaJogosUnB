import React from 'react';
import {Grid} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render GameList', () => {
  const component = renderer.create(
      <Grid doubling columns={5}>
          [{'game1'},{'game2'},{'game3'}]
      </Grid>
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
