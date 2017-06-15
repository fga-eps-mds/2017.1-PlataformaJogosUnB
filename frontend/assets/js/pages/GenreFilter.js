import React, {PropTypes} from "react";
import {Link} from "react-router-dom";
import {Segment, Grid, Container} from "semantic-ui-react";
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

    render(){

        const genre = this.props.match.params.genre;
        const gameByGenreCards =  this.getGamesByGenre().map((game) =>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={4}>
                <Link to={`/games/${game.pk}`} params={{"id": game.pk}}>
                    <GameCard data={game} />
                </Link>
            </Grid.Column>
        );

        return(
                <Container>
                    <Segment padded inverted color="brown">
                        <h1>Jogos de {genre}</h1>
                    </Segment>

                    <Grid doubling columns={5}>
                        {gameByGenreCards}
                    </Grid>
                </Container>

                );
    }

    getGamesByGenre(){

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

        return gamesFromTheGenre

    }
}

GenreFilter.propTypes = {
    match: PropTypes.object.isRequired,
    award: PropTypes.object.isRequired,
    awards: PropTypes.array.isRequired,
    getFields: PropTypes.func.isRequired,
}