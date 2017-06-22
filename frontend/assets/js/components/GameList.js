import React from "react";
import {Link} from "react-router-dom";
import {Grid, Container, Segment} from "semantic-ui-react";
import GameCard from "./cards/GameCard";
import GameItemList from "./cards/GameItemList";

export default class GameList extends React.Component {

    componentWillReceiveProps(nextProps){
        if(this.props.games != nextProps.games){
            this.props = nextProps;
            this.getGameCards(this.props.games);
            this.getGameList(this.props.games);
        }  else{
            return false;
        }
    }

    getGameCards(){
        const gamesCards = (this.props.games).map((game) =>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={4}>
                  <Link to={`/games/${game.pk}/${game.name}`}
                        params={{"id": game.pk}}>
                    <GameCard game={game} reducePlatforms={this.reducePlatforms} />
                </Link>
            </Grid.Column>
        );
        
        return this.gamesIsEmpyt(gamesCards);
    }

    getGameList(){
        const gamesList = (this.props.games).map((game) =>
                <Segment inverted color='blue'>
                    <GameItemList game={game} reducePlatforms={this.reducePlatforms} />
                </Segment>
        );

        return this.gamesIsEmpyt(gamesList);
    }

    reducePlatforms(packages){
        let platforms = [];
        if (packages !== undefined) {
            platforms = _.reduce(packages, (platform, bpackage) => { 
                const platform_icons = _.map(bpackage.platforms, (platform_param) => platform_param.icon);
                return platform.concat(platform_icons);
            }, []);
        }
        return _.uniq(platforms);
    }

    gamesIsEmpyt(games){
        if(games.length > 0){
            return games;
        } else {
            const info = <h1>Nenhum jogo encontrado</h1>;
            return info;
        }
    }

    render () {
        if(this.props.modeView) {
            return (
                <Container>
                    <Grid doubling columns={4}>
                        {this.getGameCards()}
                    </Grid>
                </Container>
            );
        } else { 
            return (
                <Container>
                    {this.getGameList()}
                </Container>
            );
        }
    }
}
