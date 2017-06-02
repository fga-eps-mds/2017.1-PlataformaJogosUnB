import React from "react";
import ReactDOM from "react-dom";
import {Card, Container, Segment} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import GameCard from "../components/cards/GameCard";
import GameList from "../components/GameList";

export default class IndexPage extends React.Component {

    render () {

        return (
            <div>
                <Container>
                    <IndexSlide />
                    <Segment padded inverted color="brown">
                        <h1>Mais curtidos</h1>
                    </Segment>
                    <GameList />
                </Container>
            </div>
        );

    }
}
