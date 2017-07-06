import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Image, Item, Button, Header} from "semantic-ui-react";
import {getKernel} from "../../resources/getKernel"
import {mountIcons} from "../../resources/mountGenresTags"
import {listImageStyle, imageStyleGameCard} from "../../resources/stylesheet/StylesheetsConsts";

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
                <Item>
                    <Item.Image style={listImageStyle} size='medium'>
                        {this.getGameLink(<Image style={imageStyleGameCard} src={this.props.game.card_image} />)}
                    </Item.Image>
                   <Item.Content verticalAlign='middle'>
                    <Item.Header>
                        {this.getGameLink(<Header inverted>{this.props.game.name} </Header>)}
                    </Item.Header>
                    <Item.Description>
                        {mountIcons(getKernel(this.props.game.packages))}
                    </Item.Description>
                    <Item.Extra>
                        {this.getGameLink(<Button basic color='green' floated='right'>Conheça mais...</Button>)}
                    </Item.Extra>
                  </Item.Content>
                </Item>
        );

    }
}

GameItemList.propTypes = {
    game: PropTypes.object.isRequired,
}
