import React from "react"
import {Link} from "react-router-dom"
import SearchBox from '../components/SearchBox'
import {Image ,Container, Grid, Header, Menu, Segment, Sidebar, Icon} from "semantic-ui-react"
import logo_menu from "../../../public/bundles/images/logo.png"

export default class MenuLayout extends React.Component {

    constructor (props) {

        super(props);
        this.state = {
            "activeItem": window.location.pathname,
            "visible": false
        };
        this.showMenuMobile = this.showMenuMobile.bind(this);

    }

    showMenuMobile () {

        this.setState({"visible": !this.state.visible});

    }

    componentWillReceiveProps () {

        this.state = {"activeItem": window.location.pathname};

    }

    checkUrlForGenre(){

        let url =  window.location.pathname

        if(url.split("/").length === 3 && url.split("/")[1] === "games"){
            return true
        }
    }

    getMenuItemLink(path,text,activeItem){

        return(
            <Menu.Item key={path} as={Link} to={path} active={activeItem}>
                    {text}
            </Menu.Item>
        )
    }

    getLinks(){

        const {activeItem} = this.state;

        const MenuLinks = [
            this.getMenuItemLink('/',<Image src={logo_menu} width='120' height='40'/>,
                (activeItem === '/')),
            <Menu.Item key={"/games/"} as={Link} to="/games/"
                active={activeItem === "/games/"|| this.checkUrlForGenre() === true}>
                        <Header inverted><Icon name='gamepad' />Jogos</Header>
                </Menu.Item>,
            this.getMenuItemLink('/about/',<Header inverted>Sobre</Header>
                    ,(activeItem === '/about/'))
        ]

        return (MenuLinks)
    }

    render () {

        const {visible} = this.state;

        return (
                <Grid>
                    <Grid.Row only="tablet mobile">
                        <Grid.Column>
                            <Segment inverted>
                                <Icon name='bars' size='big' onClick={this.showMenuMobile} />
                            </Segment>
                        <Sidebar as={Menu} animation="overlay" width="wide" visible={visible} vertical inverted onClick={this.showMenuMobile}>
                            {this.getLinks()}
                        </Sidebar>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row only="computer">
                        <Grid.Column>
                            <Segment inverted>
                                <Menu inverted pointing secondary>
                                    <Container>
                                        {this.getLinks()}
                                        <Menu.Menu position='right'>
                                            <Menu.Item>
                                                <SearchBox />
                                            </Menu.Item>
                                        </Menu.Menu>
                                    </Container>
                                </Menu>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        )
    }
}
