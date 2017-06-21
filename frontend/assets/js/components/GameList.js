import React from "react";
import {Link} from "react-router-dom";
import {Grid} from "semantic-ui-react";
import {dataListApi} from "../resources/DataListApi";
import GameCard from "./cards/GameCard";

export default class GameList extends React.Component {

    constructor (props) {

        super(props);
        this.state = {
            "games": [],
        };

    }

    loadGameFromServer (param) {
        const data = {
            platforms: param.platformOption,
            genres: param.genreOption
        }
        const url = (
            "/api/games/1/filter/?platforms=" + 
            data.platforms + "&genres=" 
            + data.genres
        );
        dataListApi(url, (games) => {

            this.setState({games});

        })

    }

    componentWillMount () {

        this.loadGameFromServer(this.props);

    }

    componentWillReceiveProps(nextProps){
        if(this.props.sortByOption != nextProps.sortByOption){
            this.sortList(nextProps.sortByOption);
        } else if(this.props.genreOption != nextProps.genreOption){
            this.props = nextProps
            this.loadGameFromServer(this.props);
        } else if(this.props.platformOption != nextProps.platformOption){
            this.props = nextProps
            this.loadGameFromServer(this.props);
        } else{
            return false;
        }
    }

    sortList(optionSelected){
         if(typeof this.state.games === "undefined"){
            return false;
        }
        const frontToBack = 'frontToBack', backToFront = 'backToFront';
        const data = optionSelected;
        const listGames = this.state.games;
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
        return listGames;
    }

    getGameCards(){
        const gameCards = this.sortList(this.props.sortByOption).map((game) =>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={4}>
                  <Link to={`/games/${game.pk}/${game.name}`}
                        params={{"id": game.pk}}>
                    <GameCard data={game} />
                </Link>
            </Grid.Column>
        );
        if(gameCards.length > 0){
            return gameCards;
        } else{
            return <h1>Nenhum jogo encontrado</h1>
        }
    }

    render () {
        return (
            <Grid doubling columns={5}>
                {this.getGameCards()}
            </Grid>
        );

    }
}
