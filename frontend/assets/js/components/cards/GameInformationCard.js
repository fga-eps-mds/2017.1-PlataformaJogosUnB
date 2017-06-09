import React from "react";
import {Button, Card, Label, Image} from "semantic-ui-react";
import { Link } from 'react-router-dom';

export default class GameInformationCard extends React.Component {
    getVersion () {
        if (this.props.version != null) {
            return <p><strong>Versão: </strong>{this.props.version}</p>;
        }
        return null;
    }

    render () {

        return (
            <Card fluid>
                <Image src={this.props.cover_image} />
                <Card.Content>
                  <Card.Header>Daniel</Card.Header>
                  <Card.Description>
                        { this.getVersion() }
                        <p><strong>Ano de lançamento: </strong>{this.props.launch_year}</p>
                        <p><strong>Gêneros: </strong>
                            <Label as='a' color='teal'>
                                {this.props.genres.map((genre) => genre.name).reduce((accu, elem) => accu === null ? [elem] : [...accu, ", ", elem], null)}
                            </Label>
                        </p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p><strong>Repositório Oficial: </strong>
                        <Link to={`this.props.official_repository`}>{this.props.official_repository}</Link>
                    </p>
                </Card.Content>
            </Card>
        );

    }
}
