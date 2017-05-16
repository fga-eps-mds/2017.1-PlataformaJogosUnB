import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

var React = require('react')
var ReactDOM = require('react-dom')

var GameList = React.createClass({
    loadGamesFromServer: function(){
        fetch(this.props.url, 
            { 
                headers: new Headers({ "Content-Type": "application/json", "Accept": "application/json"}),
                method: "GET",
            })
        .then(function(response){
             return response.json(); 
            })
        .then(function(games){
            games.forEach(function(e){console.log(e.name)});
            this.setState({data: games});
        }.bind(this))
        .catch(function(error){
            console.error(error);
        });

},

getInitialState: function(){
    return {data: []};
},

componentDidMount: function(){
    this.loadGamesFromServer();
    setInterval(this.loadGamesFromServer, this.props.pollInterval)
},
render: function() {
        if (this.state.data) {
            console.log('DATA!', this.state.data);
                return ( 

                    <div>            
                      <table className="pure-table">
                        <thead>
                          <tr>
                            <th>Nome</th>
                            <th>Versão</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.data.map(function(game){
                              return (
                                <tr key={game.id}>
                                  <td>{game.name}</td>
                                  <td>{game.game_version}</td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table> 
                    </div>    
                )
                
        
        }
        
    }
})



ReactDOM.render(<GameList url='/games/list' pollInterval={1000}/>,document.getElementById('container'))