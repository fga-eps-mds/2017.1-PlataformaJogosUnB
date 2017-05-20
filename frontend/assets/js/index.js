// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Miss } from 'react-router-dom'

class Menu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <Link to="/">Index</Link>
        <Link to="/games">Jogos</Link>
      </div>
    );
  }

}
 
class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = { game: {}};
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
        <h1>{this.state.game.name} - v{this.state.game.version}</h1>
      </div>
    );
  }
}
class Index extends React.Component {

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
        // this.loading = setInterval(this.loadGamesFromServer.bind(this), 
        //   this.props.pollInterval);
    }


    componentWillUnmount() {
      clearInterval(this.loading);
        
    }
    render() {
        return ( 
          <BrowserRouter>
            <div>          
              <Switch>
                <Route exact path="/" render={() => (<h1>ola</h1>) } />
                <Route path="/games/:id" component={Game} />
                <Route path="/games/" render={() => (<h1>oi</h1>) } />
                <Miss render={() => (<h1>404 Page</h1>)} />
              </Switch>
              <Menu />
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Versão</th>
                  </tr>
               </thead>
               <tbody> {
                 this.state.data.map((game) => {
                   return (
                      <tr key={game.id}>
                       <td>
                         <Link to={`/games/${game.pk}`} params={{id: game.pk}}>{game.name}</Link>
                       </td>
                       <td>{game.version}</td>
                     </tr>
                   );
                 })
               } </tbody>
              </table> 
            </div>
            </BrowserRouter>
                
        );

    }
};

class Layout extends React.Component {
  
}

ReactDOM.render(<Index url='/api/list/' pollInterval={1000} />,document.getElementById('container'))
