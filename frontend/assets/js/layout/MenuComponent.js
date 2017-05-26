import React from 'react';
import { Link } from 'react-router-dom'

export default class MenuComponent extends React.Component {

  render(){
    return (
      <div>
        <Link to="/">Index</Link>
        <Link to="/games">Jogos</Link>
      </div>
    );
  }
}
