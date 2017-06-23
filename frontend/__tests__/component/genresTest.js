import React from 'react';
import Genres from '../../assets/js/layout/Genres';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render Genres', () => {
  const component = renderer.create(
      <Dropdown text= 'Categorias'>
                  <Dropdown.Menu>
                      ['acao', 'aventura', 'terror']
                  </Dropdown.Menu>
      </Dropdown>
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
