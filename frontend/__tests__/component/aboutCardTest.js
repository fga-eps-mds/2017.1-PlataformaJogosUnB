import React from 'react';
import {Card, Grid, Image} from "semantic-ui-react";
import renderer from 'react-test-renderer';


test('Test render AboutCard', () => {
  const component = renderer.create(
      <Card>
          <Card.Content>
              <Card.Header>
                  {"Titulo"}
              </Card.Header>
          </Card.Content>
          <Card.Content>
              <Card.Description>
                  <Grid centered columns={5} divided>
                      <Grid.Row>
                          <Grid.Column>
                              {"description"}
                          </Grid.Column>
                          <Grid.Column>
                              <Image centered size="medium" src="./image1.jpg" />
                          </Grid.Column>
                      </Grid.Row>
                  </Grid>
              </Card.Description>
          </Card.Content>
      </Card>
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
