import React from "react";
import PropTypes from "prop-types";
import {Card, Image} from "semantic-ui-react";
import {cardImageStyleGameCard, imageStyleGameCard} from "../../resources/styleSheetConstants";

export default class GameCard extends React.Component {
    render () {
        return (
            <Card>
                <div style={cardImageStyleGameCard}>
                    <Image src={this.props.game.card_image} style={imageStyleGameCard} />
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
    reducePlatforms: PropTypes.func.isRequired,
}
