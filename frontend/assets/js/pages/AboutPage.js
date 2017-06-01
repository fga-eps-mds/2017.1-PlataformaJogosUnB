import React from 'react';
import AboutCard from '../layout/AboutCard';
import { Grid, Card, Container } from 'semantic-ui-react';


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
            <Grid padded='vertically'>
                <Grid.Row color='red'>
                    <Container>
                        <Card.Group itemsPerRow={1}>
                            <AboutCard
                                title={titleCardHeader}
                                description={descriptionCardHeader}
                                sizeGrid={1}
                            />
                        </Card.Group>
                    </Container>
                </Grid.Row>
                <Grid.Row>
                    <Container>
                        <Card.Group itemsPerRow={2}>
                            <AboutCard
                                title={'Venha conhecer'}
                                description={'desfrute de inumeros jogos'}
                                sizeGrid={1}
                            />
                            <AboutCard />
                        </Card.Group>
                    </Container>
                </Grid.Row>
            </Grid>
        );
    }
}
