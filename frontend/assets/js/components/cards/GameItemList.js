import React from "react";
import PropTypes from "prop-types";
import {Card, Image, Item, Label, Button,Icon, Header} from "semantic-ui-react";
import _ from "lodash";

const cardImageStyle = {
    "background": "#000000",
    "position": "relative",
    "minHeight": "180px",
    "minWidth": "180px",
};
const imageStyle = {
    "position": "absolute",
    "top": 0,
    "bottom": 0,
    "right": 0,
    "left": 0,
    "margin": "auto",
    "height": "100%",
};

export default class GameItemList extends React.Component {

    render () {
        return (
            <Item.Group divided unstackable>
                <Item>
                  <Item.Image size='tiny' style={cardImageStyle}>
                    <Image src={this.props.game.card_image} style={imageStyle} />
                  </Item.Image>
                  <Item.Content verticalAlign='middle'>
                    <Item.Header><Header inverted>{this.props.game.name}</Header></Item.Header>
                    
                    <Item.Meta>
                        <Image.Group>
                           {this.props.reducePlatforms(this.props.game.packages).map((icon) =>
                               <Image key={icon} src={icon} width='30' height='30' /> )
                           }
                        </Image.Group>
                    </Item.Meta>
                    
                    <Item.Extra>
                        <Button basic color='green' floated='right'>
                            Baixe agora!
                        </Button>
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

    }
}

GameItemList.propTypes = {
    game: PropTypes.object.isRequired,
}
