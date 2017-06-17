import React, {PropTypes} from "react";
import {Card, Popup, Table, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class DevelopersCard extends React.Component {
    constructor(props){
      super(props);
      this.DEVELOPER = "desenvolvedor";
      this.DESIGN = "design";
      this.MUSICIAN = "musico";
    }
  
    getRoleCells(role){
      const credits = this.props.credits;
      return (<ul>{credits.filter((credit)=> credit.specialty === role)
                    .map((developer) => {
                            if(developer.github_page !== null){
                            return (<Header.Content>
                            <Popup trigger={<Link target="_blank" to={developer.github_page}>{ developer.name }</Link>} 
                                                            content='Link para GitHub'/>
                            </Header.Content>);
                            }
                            else if(developer.email !== null){
                            return(<Header.Content>
                                 <Popup trigger={<div> {developer.name}</div> } content={developer.email}/>
                            </Header.Content>);
                            }
                            else
                                return (<Header.Content>{developer.name }</Header.Content>);

                            })}
      </ul>);
    }

    getTable(role, title){
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
                            {this.getRoleCells(role)}
                      </Table.Cell>
                     </Table.Row>
              </Table.Body>
            </Table>
      );
    }

       render () {

        return (
            <Card fluid>
                <Card.Content header="Créditos" />
                <Card.Content>
                  {this.getTable(this.DEVELOPER, "Desenvolvedores")}
                  {this.getTable(this.DESIGN, "Design")}  
                  {this.getTable(this.MUSICIAN, "Musico")}
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
