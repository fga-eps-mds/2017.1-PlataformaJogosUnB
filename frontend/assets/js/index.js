import React from 'react';
import ReactDOM from 'react-dom';
import { FlatButton, MuiThemeProvider, Card, CardTitle, CardActions, CardHeader  }  from 'material-ui';
import { Grid, Row, Col } from 'react-flexbox-grid';

var Carousel = require('react-responsive-carousel').Carousel;


const InformationCard = () => (
  <Card>
    <CardTitle title="Sobre o jogo"/>
      <CardTitle title="Versão" subtitle="1.2.3" />
      <CardTitle title="Ano" subtitle="2017" />
      <CardTitle title="Genêro" subtitle="Ação" />
      <CardTitle title="Repositório Oficial" subtitle="github.com/fga-game" />   
      <CardActions>
      <FlatButton label="Windows" />
      <FlatButton label="Mac" />
      <FlatButton label="Linux" />
    </CardActions>
  </Card>
); 

let images = [
  '/public/images/google.png',
  '/public/images/logo_og.png',
]

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
                <Carousel 
                  images={images} 
                  thumb={true}
                  loop={true}
                  autoplay={3000}/>
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
