import React from 'react';
import { Card } from 'semantic-ui-react';

export default class InformationCard extends React.Component{  

  render(){
    
    return(
     <Card fluid={true}>
        <Card.Content header='Descrição'/>
          <Card.Content  description={this.props.description} />
          <Card.Content extra >
          <p><strong>Desenvolvedores: </strong>{this.props.developers.map((developer) => {return developer.name} )}</p>
          </Card.Content>
          <Card.Content extra >
          <p><strong>Prêmios: </strong>{this.props.awards.map((award) => {return award.name})}</p>
          </Card.Content>
     </Card>
    ); 
  }
}

