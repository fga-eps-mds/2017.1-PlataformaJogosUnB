import React from "react";
import SegmentTitle from "../layout/SegmentTitle";
import {Container, Grid, Menu, Button, Icon} from "semantic-ui-react";
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
            "perPageOption": 16,
            "visible": true
        }
        this.selectViewMode = this.selectViewMode.bind(this);
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
            this.setState({pageOption: list.info.page })

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

    optionChanged(stateName, option){
        this.setState({ [stateName]: option });
    }

    selectViewMode () {
        console.log('oi')
        this.setState({"visible": !this.state.visible})
        console.log(this.state.visible)
    }

    render () {

        const {visible} = this.state;

        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <SegmentTitle title={'Lista de Jogos'} />
                    </Grid.Row>
                    
                    <Grid.Row>
                        <Menu fluid inverted>
                            <Menu.Item>
                                <SortByItems callbackParent={(stateName, option) => this.optionChanged('sortByOption', option)}/>
                            </Menu.Item>
                            <Menu.Item>
                                <GenreItems callbackParent={(stateName, option) => this.optionChanged('genreOption', option)} />
                            </Menu.Item>
                            <Menu.Item>
                                <PlatformItems callbackParent={(stateName, option) => this.optionChanged('platformOption', option)} />
                            </Menu.Item>
                            <Menu.Item>
                                <PerPageItems callbackParent={(stateName, option) => this.optionChanged('perPageOption', option)} />
                            </Menu.Item>
                            <Menu.Item position='right'>
                                <Button.Group>
                                    <Button basic color='green' onClick={this.selectViewMode}><Icon name='list layout' width='40' heigth='40' /></Button>
                                    <Button basic color='green' onClick={this.selectViewMode}><Icon name='grid layout' /></Button>
                                </Button.Group>
                            </Menu.Item>
                        </Menu>
                    </Grid.Row>

                    <Grid.Row>
                        <GameList modeView={this.state.visible}  games={this.state.games}/>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Paginator callbackParent={(stateName, option) => this.optionChanged('pageOption', option)}
                            infoPagination = {this.state.infoPagination}
                            pageOption={this.state.pageOption}/>
                    </Grid.Row>
                </Grid>
            </Container>
        );

    }
}
