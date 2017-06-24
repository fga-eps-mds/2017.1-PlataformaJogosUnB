import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Image, Item, Label, Button, Header} from "semantic-ui-react";
import {cardImageStyleItemList, imageStyleItemList} from "../../resources/styleConstants";



export default class GameItemList extends React.Component {

    getGameLink(element){
        return (
            <Link to={`/games/${this.props.game.pk}/${this.props.game.name}`}
                params={{"id": this.props.game.pk}}>
                {element}
            </Link>
        )
    }

    render () {
        return (
            <Item.Group divided unstackable>
                <Item>
                  <Item.Image size='tiny' style={cardImageStyleItemList}>
                    {this.getGameLink(<Image src={this.props.game.card_image} style={imageStyleItemList,cardImageStyleItemList} />)}
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
                        {this.getGameLink(<Button basic color='green' floated='right'>Conheça mais...</Button>)}

                        {(this.props.game.information.genres).map((genre) =>
                            { return (
                                        <Label key={genre} color='green'> {genre.name} </Label>
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
    reducePlatforms: PropTypes.func.isRequired,
}
