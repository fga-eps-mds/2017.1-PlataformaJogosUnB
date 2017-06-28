import React from "react";
import PropTypes from "prop-types";
import {Card, Image,Icon} from "semantic-ui-react";
import {getKernel} from "../../resources/getKernel"
import {kernelValidation} from "../../resources/kernelValidation"
import {mountIcons} from "../../resources/mountGenresTags"

const cardImageStyle = {
    "background": "#292A2F",
    "position": "relative",
    "minHeight": "180px",
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

export default class GameCard extends React.Component {

    render () {
        return (
            <Card>
                <div style={cardImageStyle}>
                    <Image src={this.props.game.card_image} style={imageStyle} />
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
