import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch } from 'react-router-dom';
import Game from '../layout/Game';
import IndexPage from '../pages/IndexPage';
import AboutPage from '../pages/AboutPage';
import MenuComponent from '../layout/MenuComponent';

export default class MainRoutes extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" component={IndexPage} />
                  <Route path="/games/:id" component={Game} />
                  <Route exact path="/about/" component={AboutPage} />
                </Switch>
              </div>
        );
    }
}
