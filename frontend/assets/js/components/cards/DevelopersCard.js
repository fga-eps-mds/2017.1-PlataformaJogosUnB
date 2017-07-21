import React from "react";
import PropTypes from 'prop-types';
import {Card, Popup, Table, Header,Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class DevelopersCard extends React.Component {
    constructor(props){
      super(props);
      this.DEVELOPER = "desenvolvedor";
      this.DESIGN = "design";
      this.MUSICIAN = "musico";
    }

    getIcon(information, icon,text){
        if(information !== null){
            return(
                <Popup trigger={<Link target='blank' to={information}> - <Icon size='large' name={icon}/></Link>}
                    content={text}/>
            )
        } else {
            return ''
        }
    }
    getRoleCells(role, credits){
        if(credits.lenght != []){
            return (<h7>
                    {credits.filter((credit)=> credit.specialty === role)
                        .map((developer,index) => {
                              return (
                                <Header.Content key={index}>
                                    {developer.name}
                                    {this.getIcon(developer.github_page,'github', 'Link para GitHub')}
                                    {this.getIcon(developer.behance_page,'behance', 'Link para Behance')}
                                    {this.getIcon(developer.soundCloud_page,'soundcloud', 'Link para SoundCloud')}
                                    {this.getIcon(developer.personal_page,'drivers license outline', 'Link para página pessoal')}
                                    {this.getIcon(developer.email,'mail outline', developer.email)}
                                </Header.Content>
                            )
                        })
                    }
                </h7>)
        } else {
            return <h7>Não há descrição cadastrada para esse jogo.</h7>
        }
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
      )
    }
}

DevelopersCard.propTypes = {
    credits: PropTypes.array.isRequired,
}
