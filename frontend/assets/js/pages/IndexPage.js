import React from "react";
import ReactDOM from "react-dom";
import {Card} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import GameCard from "../components/cards/GameCard";

export default class IndexPage extends React.Component {

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
                <IndexSlide />
                <h1><font color="#00ff00">Mais jogados!!!!</font></h1>
                <Card.Group itemsPerRow={4}>
                    {gameCards}
                </Card.Group>
            </div>
        );

    }
}
