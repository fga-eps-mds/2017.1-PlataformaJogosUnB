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
        this.loading = setInterval(this.loadGamesFromServer.bind(this), 
          this.props.pollInterval);
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
                <Route path="/games" render={() => (<h1>oi</h1>) } />
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
                       <td>{game.name}</td>
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



ReactDOM.render(<Index url='/games/list' pollInterval={1000}/>,document.getElementById('container'))
