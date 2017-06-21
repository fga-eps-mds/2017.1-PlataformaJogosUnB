import React, {PropTypes} from "react";
import {Modal, Header, Table} from "semantic-ui-react";

export default class ModalPackageCard extends React.Component {

    render () {

        return (
            <Modal trigger={this.props.button}>
                <Modal.Header>Pacotes disponíveis para {this.props.platform}</Modal.Header>
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
                        <Header textAlign='center'>{this.props.platform}</Header>
                      </Table.Cell>
                      
                      <Table.Cell singleLine>{this.props.platform}</Table.Cell>
                      
                      <Table.Cell>Icone</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                </Modal.Content>
              </Modal>
        );
    }
}

ModalPackageCard.propTypes = {
    button: PropTypes.object.isRequired,
    platform: PropTypes.string.isRequired,
}

