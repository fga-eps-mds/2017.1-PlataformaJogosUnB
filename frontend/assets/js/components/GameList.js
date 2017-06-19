import React from "react";
import {Link} from "react-router-dom";
import {Grid} from "semantic-ui-react";
import GameCard from "./cards/GameCard";

export default class GameList extends React.Component {

    componentWillReceiveProps(nextProps){
        if(this.props.games != nextProps.games){
            this.props = nextProps;
            this.getGameCards(this.props.games);
        }  else{
            return false;
        }
    }

    getGameCards(){
        const gameCards = this.props.games.map((game) =>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={4}>
                  <Link to={`/games/${game.pk}/${game.name}`}
                        params={{"id": game.pk}}>
                    <GameCard data={game} />
                </Link>
            </Grid.Column>
        );
        if(gameCards.length > 0){
            this.setState({ listCards: gameCards });
        } else{
            const info = <h1>Nenhum jogo encontrado</h1>;
            this.setState({ listCards: info });
        }
    }

    render () {
        return (
            <Grid doubling columns={5}>
                {this.state.listCards}
            </Grid>
        );

    }
}
