import React, {PropTypes} from "react";
import {Card, Label, Image, Header, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom';

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

                        { this.props.getFields('Versão: ',this.props.version) }
                        { this.props.getFields('Ano de lançamento: ',this.props.launch_year) }
                        { this.props.getFields('Gêneros: ', 
                            <div>
                            {this.props.genres
                                .map((genre) => { return (
                                        <Label color='green'> {genre.name} </Label>
                                    );
                                })
                            }
                            </div>
                            )
                        }
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    {this.props.getFields('Repositório Oficial: ', 
                        <Link to={`this.props.official_repository`}>{this.props.official_repository}</Link>)}
                </Card.Content>
            </Card>
        );

    }
}

GameInformationCard.propTypes = {
    cover_image: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    launch_year: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    official_repository: PropTypes.string.isRequired,
    getFields: PropTypes.func.isRequired,
}
