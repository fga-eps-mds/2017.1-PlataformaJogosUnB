import React, {PropTypes} from "react";
import {Link} from "react-router-dom";
import {Grid, Container, Menu, Dropdown} from "semantic-ui-react";
import SegmentTitle from "../layout/SegmentTitle";
import GameCard from "../components/cards/GameCard";

export default class GenreFilter extends React.Component{

    constructor (props) {

        super(props);
        this.state = {
            "game":[],
            "name": 'Ordernar por'
        }
    }

    loadGameFromServer () {

        fetch("/api/games/",
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

    sortList(data){
         if(typeof this.state.game === "undefined"){
            return false
        }
        const frontToBack = 'frontToBack', backToFront = 'backToFront';
        const listGames = this.state.game;
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
        this.setState({game: listGames});
        this.setState({name: data.name});
    }

    render(){
        const genre = this.props.match.params.genre;
        const listCards = this.getGamesByGenre().map((game, index) =>
            <Grid.Column mobile={16} tablet={8} computer={4} largeScreen={4} key={game.name}>
                <Link to={`/games/${game.pk}/${game.name}`} params={{"id": game.pk}}>
                    <GameCard data={game} />
                </Link>
            </Grid.Column>
        );
        return(
                <Container>
                <Grid>
                    <Grid.Row>
                        <SegmentTitle title={"Jogos de " + genre}/>
                    </Grid.Row>
                    <div>
                        <Menu inverted>
                            <Menu.Item>
                            <Dropdown text={this.state.name} defaultValue='Ordernar por' pointing>
                                <Dropdown.Menu>
                                    {this.listDropdownItens()}
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

    listDropdownItens(listItens){
        const rule = [{
            name: 'Nome (A-Z)',
            order: 'frontToBack',
            param: '.name',
        },{
            name: 'Nome (Z-A)',
            order: 'backToFront',
            param: '.name',
        },{
            name: 'Mais antigo',
            order: 'frontToBack',
            param: '.information.launch_year',
        },{
            name: 'Mais recente',
            order: 'backToFront',
            param: '.information.launch_year',
        }]
        const listDropItens = rule.map((item) =>
                <Dropdown.Item onClick={(e) => this.sortList(item, e)}>
                    {item.name}
                </Dropdown.Item>
        );
        return listDropItens;
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

GenreFilter.propTypes = {
    match: PropTypes.object.isRequired,
    award: PropTypes.object.isRequired,
    awards: PropTypes.array.isRequired,
    getFields: PropTypes.func.isRequired,
}
