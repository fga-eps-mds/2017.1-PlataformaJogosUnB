import React from 'react';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render SortByItems', () => {
  const component = renderer.create(
      <Dropdown text="nome" defaultValue='Ordernar por' selection>
          <Dropdown.Menu>
              {"nome do item"}
          </Dropdown.Menu>
      </Dropdown>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
