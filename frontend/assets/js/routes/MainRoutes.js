import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch } from 'react-router-dom';
import GameList from '../components/GameList';
import { Route, Switch } from 'react-router-dom';
import IndexPage from "../pages/IndexPage";
import AboutPage from "../pages/AboutPage";
import GamesPage from "../pages/GamesPage";
import GamePage from '../pages/GamePage';

export default class MainRoutes extends React.Component {

    render () {

        return (
            <div>
                <Switch>
                  <Route exact path="/" 
                    render={() => {
                        return <GamesPage index={true}  title="Mais curtidos"/>
                    } 
                    } />
                  <Route exact path="/games/" 
                    render={() => { return <GamesPage title="Lista jogos"/>}} />
                  <Route path="/games/:id" component={GamePage} />
                  <Route exact path="/about/" component={AboutPage} />
                  <Route render={() => { return <h1>404</h1> }} />
                </Switch>
            </div>
        );

    }
}
