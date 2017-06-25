import React from "react";
import PropTypes from 'prop-types';
import {Card, Popup, Table, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class DevelopersCard extends React.Component {
    constructor(props){
      super(props);
      this.DEVELOPER = "desenvolvedor";
      this.DESIGN = "design";
      this.MUSICIAN = "musico";
    }
  
    getRoleCells(role, credits){
          return (<h7>{credits.filter((credit)=> credit.specialty === role)
                        .map((developer,index) => {
                            if(developer.github_page !== null){
                              return (
                                <Header.Content key={index}>
                                  <Popup trigger={<Link to={developer.github_page}>{ developer.name }</Link>} 
                                      content='Link para GitHub'/>
                                </Header.Content>
                              )
                            }
                            else if(developer.email !== null){
                              return(
                                <Header.Content key={index}>
                                     <Popup trigger={<h7>{developer.name}</h7>} content={developer.email}/>
                                </Header.Content>
                              )
                            }
                            else
                                return (<Header.Content key={index}>{developer.name}</Header.Content>);
                            })}
                  </h7>) 
    }

    getTable(role, title){
      const credits = this.props.credits;
      var hasRoles =  credits.filter((credit)=> credit.specialty === role);

      if (hasRoles.length > 0) {
          return (<Table basic='very' celled collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Header inverted>{title}</Header>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                        <Table.Row>
                          <Table.Cell key={role}>
                                {this.getRoleCells(role, credits)}
                          </Table.Cell>
                         </Table.Row>
                  </Table.Body>
                </Table>
          )
      }
      else {
        return null;
      }
    }

       render () {

        return (
            <Card fluid>
                <Card.Content><Header as='h2'>Créditos</Header></Card.Content>
                <Card.Content>
                  {this.getTable(this.DEVELOPER, "Desenvolvedores")}
                  {this.getTable(this.DESIGN, "Designers")}  
                  {this.getTable(this.MUSICIAN, "Músicos")}
                </Card.Content>
            </Card>
        );

    }
}

DevelopersCard.propTypes = {
    developer: PropTypes.string.isRequired,
    developers: PropTypes.array.isRequired,
    credits: PropTypes.array.isRequired,
}
