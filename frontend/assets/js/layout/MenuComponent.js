import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Container, Grid, Header, Icon, Image, Input, Menu, Segment, Sidebar, Dropdown} from "semantic-ui-react";

export default class MenuComponent extends React.Component {

    constructor (props) {

        super(props);
        this.state = {
            "activeItem": window.location.pathname,
            "visible": false,
            "games" : []
        };
        this.showMenuMobile = this.showMenuMobile.bind(this);
   
    }
    loadGameFromServer () {

        fetch("/api/list/",
            {
                "headers": new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((games) => {

              this.setState({games});

          }).
          catch((error) => {

              console.error(error);

          });

    }


    showMenuMobile () {

        this.setState({"visible": !this.state.visible});

    }

    componentWillReceiveProps () {

        this.state = {"activeItem": window.location.pathname};

    }
    componentWillMount () {

        this.loadGameFromServer();

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
          
                                    <Header inverted><Dropdown inverted item text= 'Gêneros'>
                                                <Dropdown.Menu>
                                                    {this.getGenre()}
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
    getGenre(){
        var index = 0;
        const genres = [];
        const genres_strings = [];
        for(var i = 0;i < this.state.games.length;i++){
                var genre_name = this.state.games[i].information.genres[0].name 
                if(this.deleteEqualElements(genre_name, genres_strings)){
                    const genre = <Dropdown.Item text={genre_name} />
                    genres.push(genre)
                    genres_strings.push(genre_name)
                }
        }
        return genres
    }
    deleteEqualElements(element, list){
        var i = 0;
        while(i < list.length){
            if(element === list[i]){
                return false 
            }
            i++ 
        }
      
    return true
    
    }
}
