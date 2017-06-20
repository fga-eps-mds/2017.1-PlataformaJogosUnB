import React, {PropTypes} from "react";
import {Modal, Header, Table, Icon} from "semantic-ui-react";
import {dataListApi} from "../../resources/DataListApi";

const cursorMouse = {
  "cursor": "pointer",
};

export default class ModalPackageCard extends React.Component {
      constructor (props) {
          super(props);
            this.state = {
                "packages": []
          }
          this.downloadPackage = this.downloadPackage.bind(this)          
      }

      downloadPackage() {
        console.log(this.props.game)
        setTimeout(() => {
          const response = {
            file: this.state.packages[0].package,
          };
          window.location.href = response.file;
        }, 100);
      }

      loadGameFromServer () {
        const game_pk = this.props.game_pk
         const url = (
             "/api/package/1/game/?"
             + "id_game=" + game_pk
         );
         dataListApi(url, (list) => {
            this.setState({packages: list});
         })
      }

      componentDidMount () {

          this.loadGameFromServer();

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

