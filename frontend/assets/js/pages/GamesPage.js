import React from "react";
import {Container, Segment} from "semantic-ui-react";
import GameList from "../components/GameList";

export default class GamesPage extends React.Component {

    render () {

        return (
            <Container>
                <Segment padded inverted color="brown">
                    <h1>Lista de jogos</h1>
                </Segment>
                <GameList />
            </Container>
        );

    }
}
