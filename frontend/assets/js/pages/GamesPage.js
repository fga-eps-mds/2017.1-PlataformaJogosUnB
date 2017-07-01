import React, {PropTypes} from "react";
import SegmentTitle from "../layout/SegmentTitle";
import {Container, Grid, Menu, Button, Icon} from "semantic-ui-react";
import GameList from "../components/GameList";
import SortByItems from "../components/filter_items/SortByItems";
import Items from "../components/filter_items/Items";
import PerPageItems from "../components/filter_items/PerPageItems";
import Paginator from "../components/Paginator";
import LoadingAnimation from "../layout/LoadingAnimation";
import {dataListApi} from "../resources/DataListApi";

export default class GamesPage extends React.Component {

    constructor (){
        super();
        this.state = {
            "games": [],
            "sortByOption": '',
            "genreOption": '',
            "platformOption": '',
            "getGenreInUrlLimit": 0,
            "pageOption": '1',
            "infoPagination": '',
            "perPageOption": 16,
            "visible": true,
            "currentViewMode": true,
            "hasLoading": true
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

            if ((list.games).length > 0) {
                this.setState({hasLoading: false})
            }
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

    selectViewMode() {
        this.setState({"visible": !this.state.visible})
        this.setState({"currentViewMode": !this.state.currentViewMode})
    }

    genreOptionWillUpdate(){
        const genre = this.props.match.params.genre;
        const limit = this.state.getGenreInUrlLimit;
        
        if(genre !== undefined){
            if(limit < 1){
                this.state.genreOption = genre;
                this.state.getGenreInUrlLimit += 1;
                return genre;
            }
        }
        return "Categorias";

    }

    getMenuFilters(option,widthScreen){
        const urlGenre = this.genreOptionWillUpdate(); 
        return (
            <Grid.Row only={widthScreen}>
                <Container>
                    <Menu fluid vertical={option} inverted color='blue'>
                        <Menu.Item>
                            <SortByItems callbackParent={(stateName, option) => this.optionChanged('sortByOption', option)}/>
                        </Menu.Item>
                        <Menu.Item>
                            <Items type={urlGenre}  pathListApi={'/api/genres/'} text={'Todos Generos'} selectOption={'genreOption'} callbackParent={(stateName, option) => this.optionChanged('genreOption', option)} />
                        </Menu.Item>
                        <Menu.Item>
                            <Items type={'Plataformas'} pathListApi={'/api/platforms/'} text={'Todas Plataformas'} selectOption={'platformOption'} callbackParent={(stateName, option) => this.optionChanged('platformOption', option)} />
                        </Menu.Item>
                        <Menu.Item>
                            <PerPageItems callbackParent={(stateName, option) => this.optionChanged('perPageOption', option)} />
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Button.Group color={'grey'}>
                                <Button active={!this.state.currentViewMode} onClick={this.selectViewMode}><Icon name='list layout' /></Button>
                                <Button active={this.state.currentViewMode} onClick={this.selectViewMode}><Icon name='grid layout' /></Button>
                            </Button.Group>
                        </Menu.Item>
                    </Menu>
                </Container>
            </Grid.Row>
        )
    }

    render () {
        return (
            <div>
            <Container>
                <Grid>
                    <Grid.Row>
                        <SegmentTitle title={'Lista de Jogos'} />
                    </Grid.Row>

                    <Grid>
                        {this.getMenuFilters(true, "mobile")}    
                        {this.getMenuFilters(false,"tablet computer")}
                    </Grid>
                    
                    <LoadingAnimation hasLoading={this.state.hasLoading} />

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
            </div>
        );

    }
}

GamesPage.propTypes = {
    match: PropTypes.object.isRequired,
}
