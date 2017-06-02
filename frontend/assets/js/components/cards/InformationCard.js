import React from "react";
import {Card} from "semantic-ui-react";

export default class InformationCard extends React.Component {

    render () {

        return (
            <Card fluid>
                <Card.Content header="Descrição" />
                <Card.Content description={this.props.description} />
                <Card.Content extra >
                    <p><strong>Desenvolvedores: </strong>{this.props.developers.map((developer) => developer.name)}</p>
                </Card.Content>
                <Card.Content extra >
                    <p><strong>Prêmios: </strong>{this.props.awards.map((award) => award.name)}</p>
                </Card.Content>
            </Card>
        );

    }
}

