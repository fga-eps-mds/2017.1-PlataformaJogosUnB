import React from "react";
import {Container, Segment} from "semantic-ui-react";
import GameList from "../components/GameList";
import SegmentTitle from "../layout/SegmentTitle";

export default class GamesPage extends React.Component {

    render () {

        return (
            <Container>
                <SegmentTitle title={'Lista de Jogos'} />
                <GameList />
            </Container>
        );

    }
}
