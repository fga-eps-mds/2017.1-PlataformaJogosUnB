import React from 'react';
import AboutCardComponent from '../layout/AboutCardComponent';
import { Grid, Card } from 'semantic-ui-react';


export default class AboutPage extends React.Component{

    render(){
        const titleCardHeader = 'UnB Games';
        const descriptionCardHeader = [
            'A UnB games e a plataforma de jogos oficial da UnB.',
            'Aqui encontra-se jogos criados pelos alunos das disicplinas',
            'de desenvolvimento de jogos em parceria com alunos de artes',
            'cenicas, visuais e musicais. Divarta-se fazendo o download',
            'do seu jogo preferido disponivel a varias plataformas.'
        ].join(' ');

        return(
            <Grid columns={1} padded='vertically'>
                <Grid.Row/ >
                <Grid.Row>
                    <Grid.Column>
                        <Card.Group itemsPerRow={1}>
                            <AboutCardComponent title={titleCardHeader} description={descriptionCardHeader}/>
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row />
                <Grid.Row />
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column>
                        <Card.Group itemsPerRow={2}>
                            <AboutCardComponent />
                            <AboutCardComponent />
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
