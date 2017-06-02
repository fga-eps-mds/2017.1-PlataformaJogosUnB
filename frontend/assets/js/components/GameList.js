import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import {Card, Grid} from "semantic-ui-react";
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
        var gameCards = this.state.games.map((game,index)=>{
          return (
            <Grid.Column>
              <Link to={`/games/${game.pk}`} params={{id: game.pk}}>
                <GameCard data={game} />
              </Link>
            </Grid.Column>
          )
        });
        
        return(
          <div>
            <Grid doubling columns={5}>  
            {gameCards}
            </Grid>
          </div>
        );
    }
}
