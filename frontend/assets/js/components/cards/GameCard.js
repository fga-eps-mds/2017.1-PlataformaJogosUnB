import React from "react";
import PropTypes from "prop-types";
import {Card, Image} from "semantic-ui-react";
import _ from "lodash";

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
                    <Image src={this.props.game.card_image} style={imageStyle} />
                </div>
                <Card.Content>
                    <Card.Header>
                        {this.props.game.name}
                    </Card.Header>
                </Card.Content>
                <Card.Content extra>
                   <Image.Group>
                       {this.props.reducePlatforms(this.props.game.packages).map((icon) =>
                           <Image key={icon} src={icon} width='20' height='20' /> )
                       }
                   </Image.Group>
               </Card.Content>
            </Card>
        );
    }
}

GameCard.propTypes = {
    game: PropTypes.object.isRequired,
}
