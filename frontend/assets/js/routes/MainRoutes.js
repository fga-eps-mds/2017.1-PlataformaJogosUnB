import React from "react";
import ReactDOM from "react-dom";
import {Link, Route, Switch} from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import AboutPage from "../pages/AboutPage";
import GamesPage from "../pages/GamesPage";
import Game from "../pages/Game";

export default class MainRoutes extends React.Component {

    render () {

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route path="/games/:id" component={Game} />
                    <Route exact path="/games/" component={GamesPage} />
                    <Route exact path="/about/" component={AboutPage} />
                    <Route exact path="/filter/" />
                </Switch>
            </div>
        );

    }
}
