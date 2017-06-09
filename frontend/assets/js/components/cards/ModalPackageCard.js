import React from "react";
import {Button, Modal, Header, Table} from "semantic-ui-react";

export default class ModalPackageCard extends React.Component {

    render () {

        return (
            <Modal trigger={this.props.button}>
                <Modal.Header>Plataformas disponíveis</Modal.Header>
                <Modal.Content image>
                  <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>Distribuição</Table.HeaderCell>
                      <Table.HeaderCell>Tamanho do pacote</Table.HeaderCell>
                      <Table.HeaderCell>Download Icon</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h2' textAlign='center'>{this.props.plataform}</Header>
                      </Table.Cell>
                      <Table.Cell singleLine>Power Output</Table.Cell>
                      <Table.Cell>Icone</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                </Modal.Content>
              </Modal>
        );
    }
}


