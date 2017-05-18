// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import React from 'react';
import ReactDOM from 'react-dom';

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
        .then(function(response){
             return response.json(); 
            })
        .then(function(games){
            games.forEach(function(game){ console.debug(game.name); });
            this.setState({ data: games });
        }.bind(this))
        .catch(function(error){
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
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Versão</th>
                </tr>
              </thead>
              <tbody> {
                this.state.data.map(function(game){
                  return (
                    <tr key={game.id}>
                      <td>{game.name}</td>
                      <td>{game.game_version}</td>
                    </tr>
                  );
                })
              } </tbody>
            </table> 
          </div>    
        );
      } else {
        return (<span>No games</span>);
      }

    }
};



ReactDOM.render(<GameList url='/games/list' pollInterval={1000}/>,document.getElementById('container'))
