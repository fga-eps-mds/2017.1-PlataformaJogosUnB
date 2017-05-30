import React from 'react';
import InformationCard from './InformationCard.js';
import DescriptionCard from './DescriptionCard.js';
import InternalSlider from './InternalSlider.js';
import {Grid, Row, Column} from 'react-cellblock';


export default class GameListComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = { game: {} };
  }

  loadGameFromServer(){
    console.log(this.props);
    const id = this.props.match.params.id;
    console.log(id)
        fetch("/api/detail/"+id+"/",
              {
                headers: new Headers({ "Content-Type": "application/json", "Accept": "application/json"}),
                method: "GET",
            })
        .then((response) => {
             return response.json();
            })
        .then(((game) => {
            this.setState({ game: game });
        }).bind(this))
        .catch((error) => {
            console.error(error);
        });
  }

  componentDidMount() {
        this.loadGameFromServer();
    }

  render(){
    console.log(this.state.game.information);
    return (
      <div>
        <h1>TESTE</h1>
      </div>
    );
  }
}
