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
    setInterval(this.loadBooksFromServer, this.props.pollInterval)
},
render: function() {
        if (this.state.data) {
            console.log('DATA!', this.state.data);
            var gameNodes = this.state.data.map(function(game){
                return <li> {game.name} </li>
            })
        }
        return (
            <div>
                <h1>Hello React!</h1>
                <ul>
                    {gameNodes}
                </ul>
            </div>
        )
    }
})



ReactDOM.render(<GameList url='/games/list' pollInterval={1000}/>,document.getElementById('container'))