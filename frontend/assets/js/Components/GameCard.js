import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import {Grid, Row, Column} from 'react-cellblock';

const styleImage = {height: '100%'};
export default class GameCard extends React.Component{
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

  render(){
    return (

          <Card>
          <img src={this.props.data.card_image} style={styleImage}/>
            <Card.Content>
              <Card.Header>
                {this.props.data.name}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <img src={this.props.data.packages[0].platforms[0].icon} height="42" width="42" />
            </Card.Content>
          </Card>

      )
    }
}
