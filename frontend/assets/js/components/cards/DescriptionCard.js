import React from "react";
import {Button, Card} from "semantic-ui-react";

export default class DescriptionCard extends React.Component {
    getVersion () {

        if (this.props.version != null) {

            return <p><strong>Versão: </strong>{this.props.version}</p>;

        }

        return null;


    }

    render () {

        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
              Sobre o jogo
          </Card.Header>
                    <Card.Description>
                        { this.getVersion() }
                        <p><strong>Repositório Oficial: </strong>{this.props.official_repository}</p>
                        <p><strong>Ano de lançamento: </strong>{this.props.launch_year}</p>
                    </Card.Description>
                    <Card.Content extra>
                        <Button animated="fade">
                            <Button.Content visible>Linux</Button.Content>
                            <Button.Content hidden>Baixe agora</Button.Content>
                        </Button>
                    </Card.Content>
                </Card.Content>
            </Card>
        );

    }
}
