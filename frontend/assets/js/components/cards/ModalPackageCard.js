import React  from "react";
import {Modal, Header, Table, Icon, Segment, Message, Button} from "semantic-ui-react";
import {dataListApi} from "../../resources/DataListApi";
import {downloadsPackageApi} from "../../resources/packageApi"; 
import PropTypes from 'prop-types';

const cursorMouse = {
  "cursor": "pointer",
};

export default class ModalPackageCard extends React.Component {
      constructor (props) {
          super(props);
            this.state = {
                "packages": {}
          }
          this.downloadPackage = this.downloadPackage.bind(this)
          this.getPackagesByKernel = this.getPackagesByKernel.bind(this)
          this.increasePackageDownloadsCount = this.increasePackageDownloadsCount.bind(this)
      }

      increasePackageDownloadsCount(packagePk){
          downloadsPackageApi(packagePk);
      }

      downloadPackage(packagePath,packagePk) {
    
        this.increasePackageDownloadsCount(packagePk)

        setTimeout(() => {
          const response = {
            file: packagePath,
          };
          window.location.href = response.file;
        }, 100);
      }

      loadGameFromServer () {
        const game_pk = this.props.game_pk
         const url = (
             "/api/games/" + game_pk + "/platforms/?"
         );
         dataListApi(url, (list) => {
            this.setState({packages: list});
         })
      }

      componentDidMount () {
          this.loadGameFromServer();
      }

      getPackagesByKernel(kernel) {
        if(this.state.packages[kernel] != undefined){
          let packagesByKernel = this.state.packages[kernel]
          return packagesByKernel
        }else{
          return []
        }
      }

      getPlatformsList(){

        const packages_rows = (this.getPackagesByKernel(this.props.kernel)).map((eachPackage, index)=>
            <Table.Row key={index}>
              <Table.Cell>
                <Header textAlign='center'>{eachPackage.platforms}</Header>
              </Table.Cell>
              <Table.Cell>
                <Header textAlign='center'>{eachPackage.architecture}</Header>
              </Table.Cell>

              <Table.Cell><Icon name='download' style={cursorMouse} onClick={() => this.downloadPackage(eachPackage.package,eachPackage.pk)}/> {eachPackage.size}</Table.Cell>
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
                <Modal.Header>{this.props.gameName} - instaladores disponíveis para {this.props.kernel}</Modal.Header>
                <Segment>
                   <Message info>
                        <Message.Header>Termo de uso</Message.Header>
                        <p>Ao realizar o download do instalador do jogo: {this.props.gameName}. O(A) senhor(a) concorda que a plataforma de jogos da Universidade de Brasilia (UnB games) nao responsabiliza se por possiveis danos a sua maquina</p>
                    </Message> 
                </Segment>
                <Modal.Content image>
                  <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell singleLine>Plataformas</Table.HeaderCell>
                      <Table.HeaderCell singleLine>Arquitetura</Table.HeaderCell>
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
    game_pk: PropTypes.number.isRequired,
    kernel: PropTypes.string.isRequired,
    gameName: PropTypes.string.isRequired,
}
