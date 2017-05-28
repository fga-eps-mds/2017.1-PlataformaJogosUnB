import React from 'react';
import { Card } from 'semantic-ui-react';

export default class DescriptionCard extends React.Component{
  getVersion(){
    if (this.props.version != null){
      return(<p><strong>Versão: </strong>{this.props.version}</p>);
    }else{
      return (null);
    }
  };
  
  render(){
    return(
      <Card fluid={true}>
        <Card.Content>
          <Card.Header>
            Sobre o jogo
          </Card.Header>
          <Card.Description>   
            { this.getVersion() }
            <p><strong>Repositório Oficial: </strong>{this.props.official_repository}</p>
            <p><strong>Ano de lançamento: </strong>{this.props.launch_year}</p>
            <p><strong>Gênero: </strong>{this.props.name}</p>
            <p><strong>Developers: </strong> {this.props.developers.map((developer) => {return developer.name} )}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    ); 
  }
}
