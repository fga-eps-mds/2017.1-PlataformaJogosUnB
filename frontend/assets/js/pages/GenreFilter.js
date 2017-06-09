import React from "react";
import {Link} from "react-router-dom";
import {Segment, Grid, Container, Button, Menu, Dropdown} from "semantic-ui-react";
import GameCard from "../components/cards/GameCard";

export default class GenreFilter extends React.Component{

    constructor (props) {

        super(props);
        this.state = {
            "game":[]
        }
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
        then((game) => {

            this.setState({game});

        }).
        catch((error) => {

            console.error(error);

        });

    }
   componentDidMount () {

        this.loadGameFromServer();

    }

    sortListByYear(order){
        if(typeof this.state.game === "undefined"){
            return false
        }
        const listaTemp = this.state.game;
        listaTemp.sort(function(a,b){
            if(order === "older"){
                return a.information.launch_year-b.information.launch_year;
            } else if(order === "mostRecent"){
                return b.information.launch_year-a.information.launch_year;
            }
        });
        this.setState({game: listaTemp});
    }

    render(){
        const genre = this.props.match.params.genre;
        const listCards = this.getGamesByGenre().map((game, index) =>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={4}>
                <Link to={`/games/${game.pk}`} params={{"id": game.pk}}>
                    <GameCard data={game} />
                </Link>
            </Grid.Column>
        );
        return(
                <Container>
                <Grid>
                    <Grid.Row>
                        <Segment padded inverted color="brown">
                            <h1>Jogos de {genre}</h1>
                        </Segment>
                    </Grid.Row>
                    <div>
                        <Menu inverted>
                            <Menu.Item>
                            <Dropdown text='Ordernar por' pointing>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={(e) => this.sortListByYear("older", e)}>
                                        Mais antigo
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={(e) => this.sortListByYear("mostRecent", e)}>
                                        Mais recente
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <Grid.Row>
                        <Grid doubling columns={5}>
                            {listCards}
                        </Grid>
                    </Grid.Row>
                </Grid>
                </Container>

                );
    }

    getGamesByGenre(){
        if(typeof this.state.game === "undefined"){
            return false
        }
        const genre = this.props.match.params.genre;
        const gamesFromTheGenre = [];
        for(var i = 0;i < this.state.game.length;i++){
            var gameGenre = this.state.game[i].information.genres
            for(var k = 0;k < gameGenre.length;k++){
                if(genre === gameGenre[k].name){
                    gamesFromTheGenre.push(this.state.game[i])
                    break;
                }
            }
        }
        return gamesFromTheGenre;
    }

}
