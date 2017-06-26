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
    render () {
        
        const {activeItem} = this.state;
        const {visible} = this.state;

        return (
            <div>
                <Grid>
                    <Grid.Row only="tablet mobile">
                        <Grid.Column>
                            <Sidebar.Pusher>
                                <Sidebar as={Menu} animation="overlay" width="wide" visible={visible} vertical inverted onClick={this.showMenuMobile}>
                                    <Menu.Item as={Link} to="/" active={activeItem === "/"}><Header inverted>Home</Header></Menu.Item>
                                    <Menu.Item as={Link} to="/games/" active={activeItem === "/games/"}><Header inverted>Jogos</Header></Menu.Item>
                                    <Menu.Item as={Link} to="/about/" active={activeItem === "/about/"}><Header inverted>Sobre</Header></Menu.Item>
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
                                        <Menu.Item as={Link} to="/" active={activeItem === "/"}><Header inverted>Home</Header></Menu.Item>
                                        <Menu.Item as={Link} to="/games/" active={activeItem === "/games/"|| this.checkUrlForGenre() === true}><Header inverted>Jogos</Header></Menu.Item>
                                        <Menu.Item as={Link} to="/about/" active={activeItem === "/about/"}><Header inverted>Sobre</Header></Menu.Item>
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
            </div>
        );

    }
}
