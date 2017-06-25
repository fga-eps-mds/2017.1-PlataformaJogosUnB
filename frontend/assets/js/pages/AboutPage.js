import React from "react";
import AboutCard from "../layout/AboutCard";
import {Card, Container, Grid} from "semantic-ui-react";


export default class AboutPage extends React.Component {

    render () {

        const titleCardHeader = "UnB Games";
        const descriptionCardHeader = [
            "Atualmente a Unviersidade de Brasília (UnB) oferece aos seus alunos a possibilidade fazerem parte",
            "da produção de jogos digitais. Se trata de uma disciplina multidisciplinar promovendo a integração",
            "entre as áreas de design, programação e música.\n",
            "Os que cursam a disciplina pelo design - a qual é intitulada Design de Jogos - são responsáveis pela",
            "produção artística da mídia. A produção do motor gráfico e de toda a progamação é responsabilidade dos",
            "alunos que cursam Ciência da Computacao (Campus Darcy Ribeiro)  ou Engenharia de Software (Campus Gama).",
            "E os responsáveis pelas músicas e efeitos sonoros dos jogos são os alunos da disciplina Música para Jogos",
            "restrita ao curso de música do Campus Darcy Ribeiro.\n",
            "Ao longo do semestre, os alunos devem formar equipes interdisciplinares e produzir jogos inteiramente originais,",
            "e isso dá razão à existência do site em questão.  Ele foi criado com o intuito de facilitar o acesso aos jogos",
            "produzidos ao longo da disciplina, trazendo assim exemplos para futuros alunos e maior visibilidade e incentivo",
            "aos que já finalizaram a disciplina."].join(" ");

        return (
            <Grid padded="vertically">
                <Grid.Row color="blue">
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
                                title={"Venha conhecer"}
                                description={"desfrute de inumeros jogos"}
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