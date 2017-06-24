import React from 'react';
import {Card} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render DevelopersCard', () => {
  const component = renderer.create(
      <Card fluid>
          <Card.Content header="Créditos" />
            <Card.Content>
                {"DEVELOPER"}
            </Card.Content>
      </Card>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
