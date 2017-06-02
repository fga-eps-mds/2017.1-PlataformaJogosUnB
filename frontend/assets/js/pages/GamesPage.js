import React from "react";
import ReactDOM from "react-dom";
import {Card, Segment} from "semantic-ui-react";
import GameList from "../components/GameList";

export default class GamesPage extends React.Component {

    render () {

        return (
            <div>
                <Segment raised inverted color='gray'>
                    <h1>Lista de jogos</h1>
                </Segment>
                <GameList />
            </div>
        );

    }
}
