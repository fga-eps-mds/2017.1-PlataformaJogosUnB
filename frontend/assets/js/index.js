import React from 'react';
import ReactDOM from 'react-dom';
import { FlatButton, MuiThemeProvider }  from 'material-ui';


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

      if (this.state.data) {
        return ( 
          <div>
          <MuiThemeProvider>
            <FlatButton label="Full width" />
            </MuiThemeProvider>
          </div>    
        );
      } else {
        return (<span>No games</span>);
      }

    }
};


ReactDOM.render(<GameList url='/games/list' pollInterval={1000}/>,document.getElementById('container'))
