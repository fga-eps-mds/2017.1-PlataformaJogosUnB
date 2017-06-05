import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, Container, Grid, Header, Icon, Image, Input, Menu, Segment, Sidebar, Dropdown} from "semantic-ui-react";

export default class MenuComponent extends React.Component {

    constructor (props) {

        super(props);
        this.state = {
            "games":[],
            "activeItem": window.location.pathname,
            "visible": false
          
        };
        this.showMenuMobile = this.showMenuMobile.bind(this);
    }
    componentWillMount () {

        this.loadGameFromServer();

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
                                                    {this.mountGenreItems()}
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
    getGenres(){

        const gameGenres = [];
        for(var i = 0;i < this.state.games.length;i++){
            var genreName = this.state.games[i].information.genres[0].name 
            if(this.deleteEqualElements(genreName, gameGenres)){
                gameGenres.push(genreName)
            }
        }
        return gameGenres

    }
    
    mountGenreItems(){
        if(typeof this.state.games === "undefined"){
            return false
        }
        const genreNames = this.getGenres()
        const gameGenresItems = [];
        for(var i = 0;i < genreNames.length;i++){
            const genreComponent = <Dropdown.Item text={genreNames[i]} />
            gameGenresItems.push(genreComponent) 
        }
        return gameGenresItems

    }
    
    deleteEqualElements(element, list){
        var i = 0;
        console.log(list.length)
        while(i < list.length){
            if(element === list[i]){
                return false 
            }
            i++ 
        }
      
    return true
    
    }
}
