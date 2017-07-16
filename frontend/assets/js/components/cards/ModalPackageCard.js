import React  from "react"
import PropTypes from 'prop-types'
import {Modal, Header, Table, Icon} from "semantic-ui-react"
import {dataListApi} from "../../resources/DataListApi"
import {downloadsPackageApi} from "../../resources/packageApi"

const cursorMouse = {
    "cursor": "pointer",
}

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
            }

            window.location.href = response.file;
        }, 100)
      }

      loadGameFromServer () {
        const game_pk = this.props.game_pk
            const url = (
                "/api/games/" + game_pk + "/platforms/?"
            )

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
        } else {
            return []
        }
    }

    getCell(type){
        return (
            <Table.Cell>
                <Header textAlign='center'>{type}</Header>
            </Table.Cell>
        )
    }

    getPlatformsList(){
        const packages_rows = (this.getPackagesByKernel(this.props.kernel)).map((eachPackage, index)=>
            <Table.Row key={index}>
              {this.getCell(eachPackage.platforms)}
              {this.getCell(eachPackage.architecture)}
              <Table.Cell>
                <Icon name='download' style={cursorMouse} onClick={() => this.downloadPackage(eachPackage.package,eachPackage.pk)}/>
                    {eachPackage.size}
                </Table.Cell>
            </Table.Row>
        )

        return packages_rows;
    }

    getTablePackages(){
        const bodyCells = this.getPlatformsList()

        if (bodyCells.lenght != []) {
            console.log('Entrou')
            return (
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
            )
        } else {
            return <Header textAlign='center'>Não há pacotes cadastrados</Header>
        }
    }


    render () {
        return (
            <Modal trigger={this.props.button}>
                <Modal.Header>
                    {this.props.gameName} - Instaladores disponíveis para {this.props.kernel}
                </Modal.Header>
                <Modal.Content image>
                    {this.getTablePackages()}
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
    gameName: PropTypes.string.isRequired
}
