import React from "react";
import {Card, Popup} from "semantic-ui-react";
import {Link} from "react-router-dom";

const withoutSymbol = {
    "list-style-type" : "none",
}

export default class DevelopersCard extends React.Component {

    render () {

        return (
            <Card fluid>
                <Card.Content header="Créditos" />
                <Card.Content extra >
                    <ul style={withoutSymbol}>{this.props.developers.map((developer) =>
                        (<Popup trigger={<Link to="github" target="_blank" to={developer.github_page}><li>{ developer.name }</li></Link>} 
                            content='Link para GitHub'/>))}</ul>
                </Card.Content>
            </Card>
        );

    }
}

