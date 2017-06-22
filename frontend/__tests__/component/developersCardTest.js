import React, {PropTypes} from 'react';
import DevelopersCard from '../../assets/js/components/cards/DevelopersCard';
import {Card, Popup, Table, Header} from "semantic-ui-react";
import renderer from 'react-test-renderer';
import {Link} from "react-router-dom";

test('Test render DevelopersCard', () => {
  const component = renderer.create(
      <Card fluid>
          <Card.Content header="Créditos" />
          <Card.Content>
            "DEVELOPER"
          </Card.Content>
      </Card>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
