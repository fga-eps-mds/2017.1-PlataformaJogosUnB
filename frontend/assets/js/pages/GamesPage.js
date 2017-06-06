import React from "react";
import ReactDOM from "react-dom";
import {Card, Container, Segment} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import GameCard from "../components/cards/GameCard";
import GameList from "../components/GameList";

export default class GamesPage extends React.Component {

    render () {

        return (
            <div>
                <Container>
                    {this.props.index && 
                        <IndexSlide />
                    }
                    <Segment padded inverted color="brown">
                        <h1>{this.props.title}</h1>
                    </Segment>
                    <GameList />
                </Container>
            </div>
        );

    }
}
