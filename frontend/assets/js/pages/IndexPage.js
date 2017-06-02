import React from "react";
import ReactDOM from "react-dom";
import {Card, Segment} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import GameCard from "../components/cards/GameCard";
import GameList from "../components/GameList";

export default class IndexPage extends React.Component {

    render () {

        return (
            <div>
                <IndexSlide />
                <Segment padded inverted color='grey'>
                    <h1>Mais curtidos</h1>
                </Segment>
                <GameList />
            </div>
        );

    }
}
