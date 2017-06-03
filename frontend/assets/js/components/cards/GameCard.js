import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {Card, Image} from "semantic-ui-react";
const cardImageStyle = {
  background: '#000000',
  minHeight: '320px',
  position: 'relative',
}
const imageStyle = {
  position: 'absolute',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

export default class GameCard extends React.Component {
    constructor (props) {
        
        super(props);

    }

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
