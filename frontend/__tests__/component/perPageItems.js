import React from 'react';
import PerPageItems from '../../assets/js/components/filter_itens/PerPageItems';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';

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
