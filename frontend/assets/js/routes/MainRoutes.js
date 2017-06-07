import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GamePage from "../pages/GamePage";
import IndexPage from "../pages/IndexPage";
import AboutPage from "../pages/AboutPage";
import GamesPage from "../pages/GamesPage";
import GenreFilter from '../pages/GenreFilter';

export default class MainRoutes extends React.Component {

    render () {

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route path="/games/:id" component={GamePage} />
                    <Route exact path="/games/" component={GamesPage} />
                    <Route exact path="/about/" component={AboutPage} />
                    <Route path="/filter/:genre" component={GenreFilter}/>
                </Switch>
            </div>
        );

    }
}
