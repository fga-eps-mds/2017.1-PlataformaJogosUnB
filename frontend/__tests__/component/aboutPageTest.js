import React from 'react';
import AboutCard from '../../assets/js/layout/AboutCard';
import {Grid, Card, Container} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render AboutPage', () => {
  const component = renderer.create(
      <Grid padded="vertically">
          <Grid.Row color="blue">
              <Container>
                  <Card.Group itemsPerRow={1}>
                      <AboutCard
                          title="Titulo"
                          description="Descricao"
                          sizeGrid={1}
                      />
                  </Card.Group>
              </Container>
          </Grid.Row>
          <Grid.Row>
              <Container>
                  <Card.Group itemsPerRow={2}>
                      <AboutCard
                          title={"Venha conhecer"}
                          description={"desfrute de inumeros jogos"}
                          sizeGrid={1}
                      />
                      <AboutCard />
                  </Card.Group>
              </Container>
          </Grid.Row>
      </Grid>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
