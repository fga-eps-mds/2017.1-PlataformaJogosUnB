import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Container, Grid, Header, Icon, Image, Input, Menu, Segment, Sidebar, Dropdown} from "semantic-ui-react";

export default class MenuComponent extends React.Component {

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

    render () {

        const {activeItem} = this.state;
        const {visible} = this.state;


        return (
            <div>
                <Grid>
                    <Grid.Row only="tablet mobile">
                        <Grid.Column>
                            <Sidebar.Pusher>
                                <Sidebar as={Menu} animation="overlay" width="thin" visible={visible} vertical inverted onClick={this.showMenuMobile}>
                                    <Menu.Item as={Link} to="/" active={activeItem === "/"}>Index</Menu.Item>
                                    <Menu.Item as={Link} to="/games/" active={activeItem === "/games/"}>Jogos</Menu.Item>
                                    <Menu.Item as={Link} to="/about/" active={activeItem === "/about/"}>Sobre</Menu.Item>
                                    
                                </Sidebar>
                                <Segment inverted>
                                    <Menu inverted pointing secondary>
                                        <Icon name="download" inverted onClick={this.showMenuMobile} />
                                    </Menu>
                                </Segment>
                            </Sidebar.Pusher>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row only="computer large">
                        <Grid.Column>
                            <Segment inverted stackable container>
                                <Menu inverted pointing secondary>
                                    <Container>
                                        <Menu.Item as={Link} to="/" active={activeItem === "/"}><Header inverted>Index</Header></Menu.Item>
                                        <Menu.Item as={Link} to="/games/" active={activeItem === "/games/"}><Header inverted>Jogos</Header></Menu.Item>
                                        <Menu.Item as={Link} to="/about/" active={activeItem === "/about/"}><Header inverted>Sobre</Header></Menu.Item>
          
                                     <Header inverted><Dropdown inverted item text= 'Filtros'>
                                                <Dropdown.Menu>
                                                <Dropdown.Item>Semestre</Dropdown.Item>  
                                                <Dropdown.Item>Ano</Dropdown.Item>  
                                                <Dropdown vertical item text='Gênero' inverted>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>Aventura
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>Ação</Dropdown.Item>
                                                            <Dropdown.Item>Corrida</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                </Dropdown>
                                                </Dropdown.Menu>
                                    </Dropdown>
                                    </Header>
                               
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
