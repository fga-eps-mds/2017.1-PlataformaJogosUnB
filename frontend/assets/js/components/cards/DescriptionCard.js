import React from "react";
import {Card, Popup} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class DescriptionCard extends React.Component {

    render () {

        return (
            <Card fluid>
                <Card.Content header="Descrição" />
                <Card.Content description={this.props.description} />
                <Card.Content extra >
                    <p><strong>Prêmios: </strong>{this.props.awards.map((award) =>
                        <div>Nome do prêmio: { award.name } - Ano: { award.year } - Colocação: { award.place }</div>
                    )}</p>
                </Card.Content>
            </Card>
        );

    }
}

