import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch } from 'react-router-dom';
import MenuComponent from '../layout/MenuComponent';
import Game from '../pages/Game';
import GameListComponent from '../layout/GameListComponent';
import AboutPage from '../pages/AboutPage';

export default class MainRoutes extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" render={() => (<h1>/RAIZ</h1>) } />
                  <Route exact path="/games/" component={GameListComponent} />
                  <Route path="/games/:id" component={Game} />
                  <Route exact path="/about/" component={AboutPage} />
                </Switch>
              </div>
        );
    }
}
