import React from "react";
import ReactDOM from "react-dom";
import {Link, Route, Switch} from "react-router-dom";
import Game from "../components/Game";
import IndexPage from "../pages/IndexPage";
import AboutPage from "../pages/AboutPage";
import GamesPage from "../pages/GamesPage";

export default class MainRoutes extends React.Component {

    render () {

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route path="/games/" component={GamesPage} />
                    <Route path="/games/:id" component={Game} />
                    <Route exact path="/about/" component={AboutPage} />
                </Switch>
            </div>
        );

    }
}
