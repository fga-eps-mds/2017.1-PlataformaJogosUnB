import React, {PropTypes} from "react";
import {Card, Popup, Table, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class DevelopersCard extends React.Component {
  
    getDeveloper(credits){
        var temp = []
            console.log(credits);
        if(credits!==undefined){
            temp = (credits.map((credit) => credit.specialty ))
            if(temp == "desenvolvedor"){
                var developer = []
                developer = (credits.map((credit) => credit.name ))
                return developer;
            }
            else
                return " ";
        }
    };

    getDesign(credits){
        var temp2 = []
        if(credits!==undefined){
            temp2 = (credits.map((credit) => credit.specialty ))
            if(temp2 == "design"){
                var design = [] 
                design = (credits.map((credit) => credit.name ))
                return design;
            }
        else
            return " ";
        }
    };

    getMusician(credits){
        var temp3 = []
        if(credits!==undefined){
            temp3 = (credits.map((credit) => credit.specialty ))
            if(temp3 == "musico"){
                var musician = [] 
                musician = (credits.map((credit) => credit.name ))
                return musician;
            }
        else
            return " ";
        }
    };
        
    
       render () {

        return (
            <Card fluid>
                <Card.Content header="Créditos" />
                <Card.Content extra >
                    <Table basic='very' celled collapsing>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>
                            <Header inverted>Desenvolvedores</Header>
                          </Table.HeaderCell>
                          <Table.HeaderCell>
                            <Header inverted>Design</Header>
                          </Table.HeaderCell>
                           <Table.HeaderCell>
                            <Header inverted>Musicos</Header>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Header.Content>
                                    {this.getDeveloper(this.props.credits)}
                                </Header.Content>
                              </Table.Cell>
                              <Table.Cell>
                                 <Header.Content>
                                    {this.getDesign(this.props.credits)}
                                </Header.Content>
                              </Table.Cell>
                              <Table.Cell>
                                 <Header.Content>
                                    {this.getMusician(this.props.credits)}
                                </Header.Content>
                              </Table.Cell>
                             </Table.Row>
                      </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        );

    }
}

DevelopersCard.propTypes = {
    developer: PropTypes.string.isRequired,
    developers: PropTypes.array.isRequired,
}
