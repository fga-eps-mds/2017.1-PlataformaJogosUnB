import React from 'react';
import GameItemList from '../../assets/js/components/cards/GameItemList';
import {Card, Image, Item, Label, Button,Icon, Header} from 'react-facebook';
import {Link} from "react-router-dom";
import renderer from 'react-test-renderer';

test('Test render GameItemList', () => {
  const component = renderer.create(
      <Item.Group divided unstackable>
          <Item>
            <Item.Image size='tiny' style={cardImageStyle}>
              {this.getGameLink(<Image src={this.props.game.card_image} style={imageStyle,cardImageStyle} />)}
            </Item.Image>
            <Item.Content verticalAlign='middle'>
              <Item.Header>
                  {this.getGameLink(<Header inverted>{this.props.game.name}</Header>)}
              </Item.Header>

              <Item.Meta>
                  <Image.Group>
                     {this.props.reducePlatforms(this.props.game.packages).map((icon) =>
                         <Image key={icon} src={icon} width='30' height='30' /> )
                     }
                  </Image.Group>
              </Item.Meta>

              <Item.Extra>
                  {this.getGameLink(<Button basic color='green' floated='right'>Baixe agora!</Button>)}

                  {(this.props.game.information.genres).map((genre) =>
                      { return (
                                  <Label color='green'> {genre.name} </Label>
                              );
                      })
                  }
              </Item.Extra>

            </Item.Content>
          </Item>
      </Item.Group>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
