import React from 'react';
import InformationCard from './InformationCard.js';
import DescriptionCard from './DescriptionCard.js';
import InternalSlider from './InternalSlider.js';
import {Grid, Row, Column} from 'react-cellblock';
import { Card } from 'semantic-ui-react'

export default class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = { game: {information: {developers: []}, packages:[], genres:[]  }};
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

    return (
      <div>
        <h1>{this.state.game.name} </h1>
          <Grid>
            <Row>
            <Column width="1/2">
              <DescriptionCard
                version={ this.state.game.version }
                official_repository={ this.state.game.official_repository }
                launch_year={ this.state.game.information.launch_year }
                developers={this.state.game.information.developers}
              />
            </Column>
            <Column width="1/2">
              <InformationCard />
            </Column>
           </Row>
          </Grid>
      </div>
    );
  }
}
