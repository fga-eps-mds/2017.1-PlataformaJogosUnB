import React from 'react';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render PerPageItems', () => {
  const component = renderer.create(
      <Dropdown text="name" selection>
          <Dropdown.Menu>
              ['Drop1', 'Drop2', 'Drop3']
          </Dropdown.Menu>
      </Dropdown>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
