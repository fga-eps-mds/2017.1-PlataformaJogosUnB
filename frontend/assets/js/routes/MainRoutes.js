import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch } from 'react-router-dom';
import MenuComponent from '../layout/MenuComponent';
import Game from '../layout/Game';
import GameListComponent from '../layout/GameListComponent';

export default class MainRoutes extends React.Component {
  
    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" render={() => (<h1>/RAIZ</h1>) } />
                  <Route exact path="/games/" component={GameListComponent} />
                  <Route path="/games/:id" component={Game} />
                </Switch>
              </div>
        );
    }
}
