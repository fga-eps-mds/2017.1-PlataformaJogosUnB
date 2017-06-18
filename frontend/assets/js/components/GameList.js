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
            genres: param.genreOption,
            sort: param.sortByOption
        }
        const url = (
            "/api/games/1/filter/?platforms=" + data.platforms
            + "&genres=" + data.genres
            + "&sort=" + data.sort
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
            this.props = nextProps;
            this.loadGameFromServer(this.props);
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

    getGameCards(){
        const gameCards = this.state.games.map((game) =>
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
