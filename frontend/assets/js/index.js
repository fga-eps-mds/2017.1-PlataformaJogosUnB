import React from 'react';
import ReactDOM from 'react-dom';
import InformationCard from './information_card.js';
import InternalSlider from './internal_slider.js';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { MuiThemeProvider } from 'material-ui';


class GameList extends React.Component {
    constructor(props){
      super(props);
      this.state = { data: [] };
    }

    loadGamesFromServer() {
        fetch(this.props.url, 
            { 
                headers: new Headers({ "Content-Type": "application/json", "Accept": "application/json"}),
                method: "GET",
            })
        .then((response) => {
             return response.json(); 
            })
        .then(((games) => {
            games.forEach((game) => { console.debug(game.name); });
            this.setState({ data: games });
        }).bind(this))
        .catch((error) => {
            console.error(error);
        });
    }

    componentDidMount() {
        this.loadGamesFromServer();
        this.loading = setInterval(this.loadGamesFromServer.bind(this), 
        this.props.pollInterval);
    }

    componentWillUnmount() {
      clearInterval(this.loading);
        
    }

    render() {

      return ( 
        <Grid fluid>
        <MuiThemeProvider>
          <Row>
            <Col md="6">
              <InternalSlider />            
            </Col>
            <Col md="6"> 
              <InformationCard />
            </Col>
          </Row>
        </MuiThemeProvider>
        </Grid>    
      );
    }
};


ReactDOM.render(<GameList url='/games/list' pollInterval={1000}/>,document.getElementById('container'))
