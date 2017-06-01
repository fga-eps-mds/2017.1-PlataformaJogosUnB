import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

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
          <img src={this.props.data.cover_image}  height="142"/>
            <Card.Content>
              <Card.Header>
                {this.props.data.name}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
            </Card.Content>
          </Card>

      )
    }
}
