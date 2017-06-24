import React from 'react';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

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
