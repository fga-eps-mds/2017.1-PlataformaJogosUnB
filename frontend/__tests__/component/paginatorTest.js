import React from 'react';
import Paginator from '../../assets/js/components/Paginator';
import { Menu, Icon } from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render Paginator', () => {
     const component = renderer.create(
          <Menu pagination borderless inverted >
              <Menu.Item name="left_arrow"  onClick="this.handleItemClick">
                  <Icon name='angle left' />
              </Menu.Item>
              <Menu.Item name="right_arrow" onClick="this.handleItemClick">
                  <Icon name='angle outline right' />
              </Menu.Item>
          </Menu>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
