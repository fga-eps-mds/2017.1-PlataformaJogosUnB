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
        var images=[];
        var count = 0;
        var gameCards= gameCards=this.state.games.map((game)=>{
          return <GameCard data={game} />
        });
        
        for(var i = 0;i < 8;i++){
          {images.push(gameCards[i])}
        } 

        return(
          <div>
            <Card.Group itemsPerRow={4}>
              {images}
            </Card.Group>
          </div>
        );
    }
}
