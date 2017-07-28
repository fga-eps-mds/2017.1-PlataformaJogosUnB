import React from "react";
import PropTypes from "prop-types";
import {Card, Image, Label, Icon} from "semantic-ui-react";
import {getKernel} from "../../resources/getKernel"
import {mountIcons} from "../../resources/mountGenresTags"
import {cardImageStyle, imageStyleGameCard} from "../../resources/stylesheet/StylesheetsConsts";

export default class GameCard extends React.Component {

    getName(){
        let name = this.props.game.name

        if(name.length > 20){
            return name.substring(0,20) + '...'
        } else {
            return name
        }

    }

    getAwards(awards){
        if(awards.length > 0) {
            return (
                <Label as='a' color='yellow' corner>
                    <Icon color='black' name='winner'/>
                </Label>
            )
        } else {
            return null
        }
    }

    render () {
        return (
            <Card>
                <div style={cardImageStyle}>
                    {this.getAwards(this.props.game.information.awards)}
                    <Image src={this.props.game.card_image} style={imageStyleGameCard} />
                </div>
                <Card.Content>
                    <Card.Header>
                        {this.getName()}
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
