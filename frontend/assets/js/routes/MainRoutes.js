import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GamePage from '../pages/GamePage';
import GamesPage from "../pages/GamesPage";
import IndexPage from "../pages/IndexPage";
import AboutPage from "../pages/AboutPage";
export default class MainRoutes extends React.Component {

    render () {

        return (
            <div>
                <Switch>
                  <Route exact path="/" component={IndexPage} />
                  <Route exact path="/games/" component={GamesPage} />
                  <Route exact path="/games/:id/:name" component={GamePage} />
                  <Route exact path="/about/" component={AboutPage} />
                  <Route render={() => <div><h1>404</h1><h2>Page not found</h2></div>} />
                </Switch>
            </div>
        );

    }
}
