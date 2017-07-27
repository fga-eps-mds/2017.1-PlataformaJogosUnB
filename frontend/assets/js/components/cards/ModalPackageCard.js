import React  from "react"
import PropTypes from 'prop-types'
import {Modal, Header, Table, Icon, Message, Button} from "semantic-ui-react"
import {dataListApi} from "../../resources/DataListApi"
import {downloadsPackageApi} from "../../resources/packageApi"

const cursorMouse = {
    "cursor": "pointer",
}

export default class ModalPackageCard extends React.Component {
    constructor (props) {
        super(props);
            this.state = {
                "packages": {},
                "modalOpen": false,

          }
        this.downloadPackage = this.downloadPackage.bind(this)
        this.getPackagesByKernel = this.getPackagesByKernel.bind(this)
        this.increasePackageDownloadsCount = this.increasePackageDownloadsCount.bind(this)
        this.getHandleOpen = this.getHandleOpen.bind(this)
        this.getHandleClose = this.getHandleClose.bind(this)
    }

    getHandleOpen(){
        this.setState({modalOpen: true})
    }

    getHandleClose(){
        console.log('fechou')
        this.setState({modalOpen: false})
    }

    increasePackageDownloadsCount(packagePk){
        downloadsPackageApi(packagePk);
    }

    downloadPackage(packagePath,packagePk) {
        this.getHandleClose()
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
    getLicensePlatformModal(eachPackage){
        const messageLicense = "Ao realizar o download do instalador do jogo. O(A) senhor(a) concorda que a plataforma de jogos da Universidade de Brasília (UnB games), e a Universidade de Brasília não responsabiliza-se por possíveis danos em seu computador nem mal funcionamento dos jogos baixados."
        return (
            <Modal open={this.state.modalOpen} onClose={this.getHandleClose}
                trigger={
                    <Table.Cell style={cursorMouse}  onClick={this.getHandleOpen}>
                        <Icon name='download' size='large' style={cursorMouse} />
                        Baixar <strong>{this.props.gameName}</strong>
                    </Table.Cell>
                }
            >
                <Modal.Header>Termo de uso <Icon color='yellow' name='warning sign'/></Modal.Header>
                <Modal.Content>
                    <Message info>
                        <p>{messageLicense}</p>
                    </Message>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.getHandleClose}>
                        <Icon name='remove' />Não aceitar
                    </Button>
                    <Button color='green' onClick={() => this.downloadPackage(eachPackage.package,eachPackage.pk)} style={cursorMouse}>
                        <Icon name='check' />Aceitar
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }

    getPlatformsList(){
        const packages_rows = (this.getPackagesByKernel(this.props.kernel)).map((eachPackage, index)=>
            <Table.Row key={index}>
                {this.getCell(eachPackage.platforms)}
                {this.getCell(eachPackage.architecture)}
                {this.getCell(eachPackage.size)}
                {this.getLicensePlatformModal(eachPackage)}
            </Table.Row>
        )

        return packages_rows;
    }

    getTablePackages(){
        const bodyCells = this.getPlatformsList()

        if (bodyCells.lenght != []) {
            return (
                <Table key={this.props.kernel} celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>Plataforma</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Arquitetura</Table.HeaderCell>
                            <Table.HeaderCell singleLine>Tamanho do Instalador</Table.HeaderCell>
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
            <Modal key={this.props.index+this.props.game_pk} trigger={this.props.button} closeIcon='close'>
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
    game_pk: PropTypes.number.isRequired,
    kernel: PropTypes.string.isRequired,
    gameName: PropTypes.string.isRequired
}
