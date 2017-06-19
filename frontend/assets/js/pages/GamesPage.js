import React from "react";
import SegmentTitle from "../layout/SegmentTitle";
import {Container, Grid, Menu} from "semantic-ui-react";
import GameList from "../components/GameList";
import SortByItems from "../components/filter_itens/SortByItems";
import GenreItems from "../components/filter_itens/GenreItems";
import PlatformItems from "../components/filter_itens/PlatformItems";
import PerPageItems from "../components/filter_itens/PerPageItems";
import Paginator from "../components/Paginator";
import {dataListApi} from "../resources/DataListApi";

export default class GamesPage extends React.Component {

    constructor (){
        super();
        this.state = {
            "games": [],
            "sortByOption": '',
            "genreOption": '',
            "platformOption": '',
            "pageOption": '1',
            "infoPagination": '',
            "perPageOption": 16
        }
    }


    loadGameFromServer (param) {
        const data = {
            platforms: param.platformOption,
            genres: param.genreOption,
            sort: param.sortByOption,
            page: param.pageOption,
            perPage: param.perPageOption
        }
        const url = (
            "/api/games/1/games_list/?"
            + "platforms=" + data.platforms
            + "&genres=" + data.genres
            + "&sort=" + data.sort
            + "&page=" + data.page
            + "&perPage=" + data.perPage
        );
        dataListApi(url, (list) => {

            this.setState({games: list.games});
            this.setState({infoPagination: list.info })

        })

    }

    componentWillUpdate(nextProps, nextState){
        if(this.state.platformOption != nextState.platformOption){
            this.loadGameFromServer(nextState);
        } else if(this.state.genreOption != nextState.genreOption){
            this.loadGameFromServer(nextState); 
        } else if(this.state.sortByOption != nextState.sortByOption){
            this.loadGameFromServer(nextState);
        } else if(this.state.pageOption != nextState.pageOption){
            this.loadGameFromServer(nextState);
        } else if(this.state.perPageOption != nextState.perPageOption){
            this.loadGameFromServer(nextState);
        } else{
            return false;
        }
    }

    componentDidMount () {
        this.loadGameFromServer(this.state);
    }

    sortByOptionChanged(option){
        this.setState({ sortByOption: option });
    }

    genreOptionChanged(option){
        this.setState({ genreOption: option });
    }

    platformOptionChanged(option){
        this.setState({ platformOption: option });
    }

    pageOptionChanged(option){
        this.setState({ pageOption: option });
    }

    perPageOptionChanged(option){
        this.setState({ perPageOption: option });
    }

    render () {

        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <SegmentTitle title={'Lista de Jogos'} />
                    </Grid.Row>
                    
                    <Grid.Row>
                        <Menu fluid inverted>
                            <Menu.Item>
                                <SortByItems callbackParent={(option) => this.sortByOptionChanged(option)}/>
                            </Menu.Item>
                            <Menu.Item>
                                <GenreItems callbackParent={(option) => this.genreOptionChanged(option)} />
                            </Menu.Item>
                            <Menu.Item>
                                <PlatformItems callbackParent={(option) => this.platformOptionChanged(option)} />
                            </Menu.Item>
                            <Menu.Item>
                                <PerPageItems callbackParent={(option) => this.perPageOptionChanged(option)} />
                            </Menu.Item>
                        </Menu>
                    </Grid.Row>

                    <Grid.Row>
                        <GameList games={this.state.games}/>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Paginator callbackParent={(option) => this.pageOptionChanged(option)} infoPagination = {this.state.infoPagination}/>
                    </Grid.Row>
                </Grid>
            </Container>
        );

    }
}
