import React from "react";
import {Card, Label, Image} from "semantic-ui-react";
import { Link } from 'react-router-dom';

export default class GameInformationCard extends React.Component {
    
    getFields (title,value) {
        if (value != null) {
            return <p><strong>{title}</strong>{value}</p>;
        }
        return null;
    }

    render () {

        return (
            <Card fluid>
                <Image src={this.props.cover_image} />
                <Card.Content>
                  <Card.Description>
                        { this.getFields('Versão: ',this.props.version) }
                        { this.getFields('Ano de lançamento: ',this.props.launch_year) }
                        <p><strong>Gêneros: </strong>
                            <Label as='a' color='teal'>
                                {this.props.genres.map((genre) => genre.name).reduce((accu, elem) => accu === null ? [elem] : [...accu, ", ", elem], null)}
                            </Label>
                        </p>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <p><strong>Repositório Oficial: </strong>
                        <Link target="_blank" to={`${this.props.official_repository}`}>{ this.props.official_repository }</Link>
                    </p>
                </Card.Content>
            </Card>
        );

    }
}
