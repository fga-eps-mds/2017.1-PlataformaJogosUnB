import React from 'react';
import GameItemList from '../../assets/js/components/cards/GameItemList';
import {Card, Image, Item, Label, Button,Icon, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";
import renderer from 'react-test-renderer';

test('Test render GameItemList', () => {
  const component = renderer.create(
      <Item.Group divided unstackable>
          <Item>
            <Item.Image size='tiny' style="style">
             <Image src="./image.jpg" style="style" />)
            </Item.Image>
            <Item.Content verticalAlign='middle'>
              <Item.Header>
                  "name"
              </Item.Header>

              <Item.Meta>
                  <Image.Group>

                         <Image key={1} src={1} width='30' height='30' /> )

                  </Image.Group>
              </Item.Meta>

              <Item.Extra>
                 <Button basic color='green' floated='right'>Baixe agora!</Button>)

                 <Label color='green'> "acao" </Label>

              </Item.Extra>

            </Item.Content>
          </Item>
      </Item.Group>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
