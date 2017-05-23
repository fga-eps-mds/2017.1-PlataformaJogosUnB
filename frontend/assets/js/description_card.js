import React from 'react';
import ReactDOM from 'react-dom';
import { FlatButton, Card, CardTitle, CardActions, CardHeader } from 'material-ui';

export default class DescriptionCard extends React.Component{
  render(){

    return(
      <Card>
        <CardTitle title="Sobre o jogo"/>
          <CardTitle title="Versão" subtitle="1.2.3" />
          <CardTitle title="Ano" subtitle="2017" />
          <CardTitle title="Gênero" subtitle="Ação" />
          <CardTitle title="Repositório Oficial" subtitle="github.com/fga-game" />  
      </Card>
    ); 
  }
}
