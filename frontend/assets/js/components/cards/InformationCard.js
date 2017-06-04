import React from "react";
import {Card, Popup, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class InformationCard extends React.Component {

    render () {

        return (
            <Card fluid>
                <Card.Content header="Descrição" />
                <Card.Content description={this.props.description} />
                <Card.Content extra >
                    
                    <p><strong>Desenvolvedores: </strong>{this.props.developers.map((developer) => {
                        return <Popup trigger={<Link to="github" target="_blank" to={developer.github_page}> { developer.name }</Link>} 
                            content='Link para github'/>} )}</p>
                </Card.Content>
                <Card.Content extra >
                    <p><strong>Prêmios: </strong>{this.props.awards.map((award) => award.name)}</p>
                </Card.Content>
            </Card>
        );

    }
}

