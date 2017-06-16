import React from "react";
import {Link} from "react-router-dom";
import {Grid} from "semantic-ui-react";
import GameCard from "./cards/GameCard";

export default class GameList extends React.Component {

    constructor (props) {

        super(props);
        this.state = {
            "games": [],
            "filteredGames": []
        };

    }

    loadGameFromServer () {

        fetch("/api/games/",
            {
                "headers": new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                "method": "GET",
                "data": {
                    platforms: [props.sortByOption],
                    genres: [props.genreOptio]
                },
            }).
          then((response) => response.json()).
          then((games) => {

              this.setState({games});
              this.setState({filteredGames: games})

          }).
          catch((error) => {

              console.error(error);

          });
    }

    componentDidMount () {

        this.loadGameFromServer();

    }

    componentWillReceiveProps(nextProps){
        if(this.props.sortByOption != nextProps.sortByOption){
            this.sortList(nextProps.sortByOption, this.state.filteredGames);
        } else if(this.props.genreOption != nextProps.genreOption){
            this.getGamesByGenre(nextProps.genreOption);
        }else{
            console.log(this.nextProps.sortByOption);
            return false;
        }
    }

    sortList(optionSelected, list){
         if(typeof this.state.games === "undefined"){
            return false;
        }
        const frontToBack = 'frontToBack', backToFront = 'backToFront';
        const data = optionSelected;
        const listGames = list;
        listGames.sort((a,b) => {
                if(data.order === frontToBack){
                    if(eval('a'+data.param) > eval('b'+data.param)) return 1;
                    if(eval('a'+data.param) < eval('b'+data.param)) return -1;
                } else if(data.order === backToFront){
                    if(eval('b'+data.param) > eval('a'+data.param)) return 1;
                    if(eval('b'+data.param) < eval('a'+data.param)) return -1;
                }
                return 0;
            }
        );
        this.setState({ filteredGames: listGames });
    }

    getGamesByGenre(optionSelected){
        if(typeof this.state.games === "undefined"){
            return false
        }
        const genre = optionSelected;
        const gamesFromTheGenre = [];
        for(var i = 0;i < this.state.games.length;i++){
            var gameGenre = this.state.games[i].information.genres
            for(var k = 0;k < gameGenre.length;k++){
                if(genre === gameGenre[k].name){
                    gamesFromTheGenre.push(this.state.games[i])
                    break;
                }
            }
        }
        if(optionSelected != 'Todas as categorias'){
            this.sortList(this.props.sortByOption, gamesFromTheGenre);
        } else{
            this.sortList(this.props.sortByOption, this.state.games);
        }
    }


    render () {

        const gameCards = this.state.filteredGames.map((game) =>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={4}>
                  <Link to={`/games/${game.pk}/${game.name}`}
                        params={{"id": game.pk}}>
                    <GameCard data={game} />
                </Link>
            </Grid.Column>
          );
        return (
            <Grid doubling columns={5}>
                {gameCards}
            </Grid>
        );

    }
}
