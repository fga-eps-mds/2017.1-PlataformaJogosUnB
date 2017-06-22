import React from 'react';
import SortByItems from '../../assets/js/components/filter_itens/SortByItems';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render SortByItems', () => {
  const component = renderer.create(
      <Dropdown text="nome" defaultValue='Ordernar por' selection>
          <Dropdown.Menu>
              "nome do item"
          </Dropdown.Menu>
      </Dropdown>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
