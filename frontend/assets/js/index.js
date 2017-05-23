import React from 'react';
import ReactDOM from 'react-dom';
import InformationCard from './components/information_card.js';
import DescriptionCard from './components/description_card.js';
import InternalSlider from './components/internal_slider.js';
import {Grid, Row, Column} from 'react-cellblock';
import { MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';


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
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Grid>
            <Row>
            <Column width="1/2">
              <InternalSlider />            
            </Column>
            <Column width="1/2"> 
              <InformationCard />
            </Column>
            <Column width="1/2"> 
              <DescriptionCard />
            </Column>
           </Row>
          </Grid>
        </MuiThemeProvider> 
      );
    }
};


ReactDOM.render(<GameList url='/games/list' pollInterval={1000}/>,document.getElementById('container'))
