import React from "react";
import ReactDOM from "react-dom";
import {Card} from "semantic-ui-react";
import GameCard from "./cards/GameCard";

export default class GameListComponent extends React.Component {

    constructor (props) {

        super(props);
        this.state = {"games": []};

    }

    loadGameFromServer () {

        fetch("/api/list/",
            {
                "headers": new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((games) => {

              this.setState({games});

          }).
          catch((error) => {

              console.error(error);

          });

    }

    componentDidMount () {

        this.loadGameFromServer();

    }

    render () {

        const gameCards = this.state.games.map((game) => <GameCard data={game} />);

        return (
            <div>
                <Card.Group itemsPerRow={4}>
                    {gameCards}
                </Card.Group>
            </div>
        );

    }
}
