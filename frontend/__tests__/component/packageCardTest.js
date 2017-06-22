import React from 'react';
import PackageCard from '../../assets/js/components/cards/PackageCard';
import {Card, Button, Grid} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render PackageCard', () => {
  const component = renderer.create(
      <Card fluid>
          <Card.Content header="Download"/>
          <Card.Content>
              <Grid centered size='large'>
                  <Button.Group>
                     ['button1','button2','button3']
                  </Button.Group>
              </Grid>
          </Card.Content>
          <Card.Content extra/>
      </Card>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
