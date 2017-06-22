import React from 'react';
import GameCard from '../../assets/js/components/cards/GameCard';
import {Card, Image} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render GameCard', () => {
  const component = renderer.create(
      <Card>
          <div style= 'lolo'>
            <Image src="./image.jpg" style= 'lala' />
          </div>
          <Card.Content>
              <Card.Header>
                  "nome"
              </Card.Header>
          </Card.Content>
          <Card.Content extra>
                  <img key='1' src="./image2.jpg" width='20' height='20' /> )
          </Card.Content>
      </Card>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
