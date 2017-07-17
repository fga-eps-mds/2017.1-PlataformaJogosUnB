import React from "react";
import PropTypes from 'prop-types';
import {Card, Image, Header, Segment, Label} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {mountGenresTags} from "../../resources/mountGenresTags";
import {listImageStyle, imageStyleGameCard} from "../../resources/stylesheet/StylesheetsConsts";
import Rating from '../Rating'
export default class GameInformationCard extends React.Component {

    getImages (img) {
        if (img != null) {
            return (
                <div style={listImageStyle}>
                    <Image style={imageStyleGameCard} src={img} />
                </div>
            )
        } else {
            return (
                <Segment inverted color='blue'>
                    <Header textAlign='center'>Não há imagem cadastrada!</Header>
                </Segment>
            )
        }
    }

    render () {
        return (
            <Card fluid>
                {this.getImages(this.props.cover_image)}

                <Card.Content>
                    <Card.Description>
                        <p>{ this.props.getFields('Versão: ',this.props.version,'') }</p>
                        <p>{ this.props.getFields('Ano de lançamento: ',this.props.launch_year,'') }</p>
                        <p>{this.props.getFields('Repositório Oficial: ',
                            <Link target='blank' to={`${this.props.official_repository}`}>{ this.props.official_repository }</Link>)}</p>
                        <p><h7><strong>Gêneros: </strong></h7></p><Label.Group>{mountGenresTags(this.props.genres)}</Label.Group>
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <Rating pk={this.props.pk} />
                </Card.Content>
            </Card>
        );

    }
}

GameInformationCard.propTypes = {
    cover_image: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    official_repository: PropTypes.string.isRequired,
    launch_year: PropTypes.number.isRequired,
    pk: PropTypes.number.isRequired,
    genres: PropTypes.array.isRequired,
    getFields: PropTypes.func.isRequired,
}
