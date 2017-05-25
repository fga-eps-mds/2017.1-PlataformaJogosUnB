import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Miss } from 'react-router-dom';


export default class MainRoutes extends React.Component {

    render() {
        return (
          <div>
          <h1> OLARRRRRRRRRR </h1>

            <BrowserRouter>
              <div>
              <Switch>
                <Route exact path="/" render={() => (<h1>ola</h1>) } />
                <Route path="/games/:id" component={Game} />
                <Route path="/games/" render={() => (<h1>oi</h1>) } />
                <Miss render={() => (<h1>404 Page</h1>)} />
                </Switch>
                <table >
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
              </div>
        );
    }
}
