import React from "react";
import {Link} from "react-router-dom";
import SearchBox from '../components/SearchBox'
import {Container, Grid, Header, Menu, Segment, Sidebar, Icon} from "semantic-ui-react";

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
        return(<Menu.Item key={path} as={Link} to={path} active={activeItem}><Header inverted>{text}</Header></Menu.Item>)
    }

    getLinks(){
        const {activeItem} = this.state;
        const MenuLinks = [
                this.getMenuItemLink('/','UnB Games',(activeItem === '/')),
                <Menu.Item key={"/games/"} as={Link} to="/games/" active={activeItem === "/games/"|| this.checkUrlForGenre() === true}>
                    <Header inverted><Icon color='green' name='gamepad' />Jogos</Header>
                </Menu.Item>,
                this.getMenuItemLink('/about/','Sobre',(activeItem === '/about/'))
        ]
        return (MenuLinks)
    }

    render () {
        const {visible} = this.state;

        return (
                <Grid>
                    <Grid.Row only="tablet mobile">
                        <Grid.Column>
                            <Sidebar.Pusher>
                                <Sidebar as={Menu} animation="overlay" width="wide" visible={visible} vertical inverted onClick={this.showMenuMobile}>
                                    {this.getLinks()}
                                </Sidebar>
                                <Segment inverted>
                                    <Menu inverted pointing secondary>
                                        <Icon name='bars' size='big' onClick={this.showMenuMobile} />
                                    </Menu>
                                </Segment>
                            </Sidebar.Pusher>
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
        );

    }
}
