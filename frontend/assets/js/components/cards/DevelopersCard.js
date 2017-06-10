import React, {PropTypes} from "react";
import {Card, Popup, Table, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";

export default class DevelopersCard extends React.Component {

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
                            <Header inverted>Artistas</Header>
                          </Table.HeaderCell>
                           <Table.HeaderCell>
                            <Header inverted>Musicos</Header>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Header.Content> {this.props.developers.map((developer) =>
                                <Popup trigger={<Link to="github" target="_blank" to={developer.github_page}>{ developer.name }</Link>} 
                                content='Link para GitHub'/>
                                )}
                                </Header.Content>
                              </Table.Cell>
                              <Table.Cell>
                                <Header.Content> {this.props.artists.map((artist) =>
                                <div> {artist.name} </div>
                                )}
                                </Header.Content>
                              </Table.Cell>
                              <Table.Cell>
                                <Header.Content> {this.props.musicians.map((musician) =>
                                <div> {musician.name} </div>
                                )}
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
