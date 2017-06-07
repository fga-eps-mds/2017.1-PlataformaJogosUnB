import React from "react";
import {Button, Card, Popup} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class InformationCard extends React.Component {

    render () {

        return (
            <Card fluid>
                <Card.Content header="Descrição" />
                <Card.Content description={this.props.description} />
                <Card.Content extra >
                    <p><strong>Desenvolvedores: </strong>{this.props.developers.map((developer) =>
                        (<Popup trigger={<Link to="github" target="_blank" to={developer.github_page}> { developer.name }</Link>} 
                            content='Link para GitHub'/>)).reduce((accu, elem) => accu === null ? [elem] : [...accu, ",", elem], null)}</p>
                </Card.Content>
                <Card.Content extra >
                    <p><strong>Prêmios: </strong>{this.props.awards.map((award) =>
                        <div>Nome do prêmio: { award.name } - Ano: { award.year } - Colocação: { award.place }</div>
                    )}</p>
                </Card.Content>
            </Card>
        );

    }
}

