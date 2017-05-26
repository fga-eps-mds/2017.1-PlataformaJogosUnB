import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, Switch, Miss } from 'react-router-dom';
import MenuComponent from '../layout/MenuComponent';

export default class MainRoutes extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                  <Route exact path="/" render={() => (<h1>ola</h1>) } />
                  <Route path="/games/" render={() => (<h1>oi</h1>) } />
                  <Miss render={() => (<h1>404 Page</h1>)} />
                </Switch>
              </div>
        );
    }
}
