import React from "react";
import PropTypes from 'prop-types';
import {Card, Image, Header, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {mountGenresTags} from "../../resources/mountGenresTags";

export default class GameInformationCard extends React.Component {

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
                        <p>{ this.props.getFields('Versão: ',this.props.version,'') }</p>
                        <p>{ this.props.getFields('Ano de lançamento: ',this.props.launch_year,'') }</p>
                        <p><h7><strong>Gêneros: </strong></h7></p> {mountGenresTags(this.props.genres)}
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    {this.props.getFields('Repositório Oficial: ',
                        <Link target='blank' to={`${this.props.official_repository}`}>{ this.props.official_repository }</Link>)}
                </Card.Content>
            </Card>
        );

    }
}

GameInformationCard.propTypes = {
    getFields: PropTypes.func.isRequired,
}
