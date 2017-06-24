import React from 'react';
import { Segment } from 'semantic-ui-react';
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render SegmentTitle', () => {
  const component = renderer.create(
      <Segment padded inverted color="grey">
          <h1>"Titulo"</h1>
      </Segment>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
