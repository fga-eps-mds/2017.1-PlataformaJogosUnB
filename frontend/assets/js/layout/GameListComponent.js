import React from 'react';
import ReactDOM from 'react-dom';
import GameCard from '../Components/GameCard'
import { Card } from 'semantic-ui-react'
import IndexSlider from './IndexSlider.js'
import { Grid, Row, Column } from 'react-cellblock'
export default class GameListComponent extends React.Component {

    constructor(props){
      super(props);
      this.state = { games: [] };
    }

    loadGameFromServer(){
          fetch("/api/list/",
                {
                  headers: new Headers({ "Content-Type": "application/json", "Accept": "application/json"}),
                  method: "GET",
              })
          .then((response) => {
               return response.json();
              })
          .then(((games) => {
              this.setState({ games: games });
          }).bind(this))
          .catch((error) => {
              console.error(error);
          });
    }

    componentDidMount() {
          this.loadGameFromServer();
      }

    render() {
      var gameCards = gameCards=this.state.games.map((game)=>{return <GameCard data={game} />});
      return(
         <div>
               <br/>
               <br/>
               <br/>
               <IndexSlider/>
               <br/>
               <br/>
               <br/>
            <h1><font color="#00ff00">Mais jogados!!!!</font></h1>
            <Card.Group itemsPerRow={4}>
            {gameCards}
            </Card.Group>
    </div>
);
}
}
