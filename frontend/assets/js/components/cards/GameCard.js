import React from "react";
import PropTypes from "prop-types";
import {Card, Image} from "semantic-ui-react";
const cardImageStyle = {
    "background": "#000000",
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
                    <Image src={this.props.data.card_image} style={imageStyle} />
                </div>
                <Card.Content>
                    <Card.Header>
                        {this.props.data.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content extra />
            </Card>

        );

    }
}

GameCard.propTypes = {
    data: PropTypes.object.isRequired,
}
