import React from "react";
import {Card, Label, Image, Header, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom';

export default class GameInformationCard extends React.Component {
    
    getFields (title,value) {
        if (value != null) {
            return <p><strong>{title}</strong>{value}</p>;
        }
        return null;
    }

    getImages (img) {
        if (img != null) {
            return <Image src={img} />;
        }
        return (
            <Segment inverted color='blue'>
                <Header textAlign='center'>Não há imagem cadastrada!</Header>
            </Segment>
        );
    }

    render () {

        return (
            <Card fluid>
                {this.getImages(this.props.cover_image)}            

                <Card.Content>
                
                  <Card.Description>
                        { this.getFields('Versão: ',this.props.version) }
                        { this.getFields('Ano de lançamento: ',this.props.launch_year) }
                        { this.getFields('Gêneros: ', 
                            <Label as='a' color='green'>
                                {this.props.genres.map((genre) => genre.name).reduce((accu, elem) => accu === null ? [elem] : [...accu, ", ", elem], null)}
                            </Label>)}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    {this.getFields('Repositório Oficial: ', 
                        <Link to={`this.props.official_repository`}>{this.props.official_repository}</Link>)}
                </Card.Content>
            </Card>
        );

    }
}
