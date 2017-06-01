import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { Card } from 'semantic-ui-react'
import {Grid, Row, Column} from 'react-cellblock';

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
  hasPackage(){
	var package_game 
	var image_icon 
	if(typeof  this.props.data.packages[0] === "undefined"){
		console.log("entrou")
		image_icon = ""
	}else{
		image_icon = <img src={this.props.data.packages[0].platforms[0].icon}  height="42" width="42"/> 
	}			
	return image_icon
  }

  render(){

    return (

          <Card>
		<img src={this.props.data.cover_image} height="142" />
            <Card.Content>
              <Card.Header>
                {this.props.data.name}
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
		{this.hasPackage()}
            </Card.Content>
          </Card>

      )
    }
}
