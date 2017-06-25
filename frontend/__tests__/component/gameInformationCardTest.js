import React from 'react';
import {Card, Image} from "semantic-ui-react";
import renderer from 'react-test-renderer';


test('Test render GameInformationCard', () => {
  const component = renderer.create(
      <Card fluid>
          <Image src="./image.jpg"/>

          <Card.Content>

            <Card.Description>
                  {"1.0"},
                  {"2016"},
                  {"nome"}
              </Card.Description>
          </Card.Content>

          <Card.Content extra>
              {"https://google.com"}
          </Card.Content>
      </Card>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
