import React from 'react';
import {Dropdown} from "semantic-ui-react";
import renderer from 'react-test-renderer';


test('Test render PlatformItems', () => {
  const component = renderer.create(
      <Dropdown text="Windows" selection>
          <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => this.handleClick('', e)}>
                  Todas plataformas
              </Dropdown.Item>
              {"Windows"}
          </Dropdown.Menu>
      </Dropdown>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
