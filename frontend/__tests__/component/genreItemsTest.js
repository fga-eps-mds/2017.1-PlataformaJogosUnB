import React from 'react';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render GenreItems', () => {
  const component = renderer.create(
      <Dropdown text="acao" selection>
          <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => this.handleClick('', e)}>
                  Todas as categorias
              </Dropdown.Item>
              "acao"
          </Dropdown.Menu>
      </Dropdown>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
