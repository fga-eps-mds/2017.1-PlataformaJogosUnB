import React from "react";
import PropTypes from "prop-types";
import {Card, Image} from "semantic-ui-react";
import {getKernel} from "../../resources/getKernel"
import {mountIcons} from "../../resources/mountGenresTags"
import {cardImageStyle, imageStyleGameCard} from "../../resources/stylesheet/StylesheetsConsts";

export default class GameCard extends React.Component {

    render () {
        return (
            <Card>
                <div style={cardImageStyle}>
                    <Image src={this.props.game.card_image} style={imageStyleGameCard} />
                </div>
                <Card.Content>
                    <Card.Header>
                        {this.props.game.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                    {mountIcons(getKernel(this.props.game.packages))} 
                </Card.Content>
            </Card>
        );
    }
}

GameCard.propTypes = {
    game: PropTypes.object.isRequired,
}
