import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, Miss } from 'react-router-dom';
import MenuComponent from '../layout/MenuComponent';
import Game from '../layout/Game';

export default class MainRoutes extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" render={() => (<h1>/RAIZ</h1>) } />
                  <Route exact path="/games/" render={() => (<h1>/GAMES</h1>) } />
                  <Route path="/games/:id" component={Game} />
                  <Miss render={() => (<h1>404 Page</h1>)} />
                </Switch>
              </div>
        );
    }
}
