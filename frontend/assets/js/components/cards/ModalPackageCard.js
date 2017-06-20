import React, {PropTypes} from "react";
import {Modal, Header, Table, Icon} from "semantic-ui-react";


const cursorMouse = {
  "cursor": "pointer",
};
      
export default class ModalPackageCard extends React.Component {

      downloadPackage() {
        setTimeout(() => {
          const response = {
            file: 'http://releases.ubuntu.com/12.04.5/ubuntu-12.04.5-alternate-amd64.iso',
          };
          window.location.href = response.file;
        }, 100);
      }

      getPlatformsList(){
        
        const packages_rows = (this.props.platform).map((value)=>
                    <Table.Row>
                      <Table.Cell>
                        <Header textAlign='center'>{value.name}</Header>
                      </Table.Cell>
                      
                      <Table.Cell singleLine>{}</Table.Cell>                      
                      <Table.Cell><Icon name='download' style={cursorMouse} onClick={this.downloadPackage}/></Table.Cell>
                    </Table.Row>
                  );
        
        if (packages_rows!=[]) {
            return packages_rows;
        }

        return <Button basic color='red'>Nao ha pacotes cadastrados</Button>;
    }

      render () {

        return (
            <Modal trigger={this.props.button}>
                <Modal.Header>Pacotes disponíveis</Modal.Header>
                <Modal.Content image>
                  <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>Distribuição</Table.HeaderCell>
                      <Table.HeaderCell>Tamanho do pacote</Table.HeaderCell>
                      <Table.HeaderCell>Download</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                        {this.getPlatformsList()}
                  </Table.Body>
                </Table>
                </Modal.Content>
              </Modal>
        );
    }
}

ModalPackageCard.propTypes = {
    button: PropTypes.object.isRequired,
    platform: PropTypes.array.isRequired,
}

