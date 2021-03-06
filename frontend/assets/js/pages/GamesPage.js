import React from "react";
import PropTypes from 'prop-types';
import {Container, Grid, Menu, Button, Icon} from "semantic-ui-react";
import GameList from "../components/GameList";
import Items from "../components/filter_items/Items";
import SortAndPerPageItems from "../components/filter_items/SortAndPerPageItems";
import Paginator from "../components/Paginator";
import LoadingAnimation from "../layout/LoadingAnimation";
import {dataListApi} from "../resources/DataListApi";
import {numbersOfExibtionItems, rule} from "../resources/Constants";

export default class GamesPage extends React.Component {

    constructor (){
        super()
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

    componentWillMount(){
        const genre = this.props.match.params.genre;

        if(genre !== undefined){
            this.setState({genreOption: genre}, () => {
                genre
            })
        }
    }

    getGenreName(){
        if(this.state.genreOption === ''){
            return "Todos Gêneros"
        } else {
            return this.state.genreOption
        }
    }

    getSortAndPerPageItems(optionSort, itemsArray, selectOption, text){
        return (
            <SortAndPerPageItems
                 optionDefault={optionSort}
                 items={itemsArray}
                 selectionOption={selectOption}
                 textDropbox={text}
                 callbackParent={(stateName, option) => this.optionChanged(selectOption, option)}
            />
        )
    }

    getMenuFilters(option,widthScreen){
        return (
            <Grid.Row only={widthScreen}>
                <Grid.Column>
                    <Menu fluid vertical={option} inverted color='blue'>
                        <Menu.Item>
                            {this.getSortAndPerPageItems('A-Z',rule,'sortByOption','Ordenar por: ')}
                        </Menu.Item>
                        <Menu.Item>
                            <Items
                                type={this.getGenreName()}
                                pathListApi={'/api/genres/'}
                                text={'Todos Gêneros'}
                                selectOption={'genreOption'}
                                callbackParent={(stateName, option) => this.optionChanged('genreOption', option)}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            <Items
                                type={'Todas Plataformas'}
                                pathListApi={'/api/platforms/'}
                                text={'Todas Plataformas'}
                                selectOption={'platformOption'}
                                callbackParent={(stateName, option) => this.optionChanged('platformOption', option)}
                            />
                        </Menu.Item>
                        <Menu.Item>
                            {this.getSortAndPerPageItems('16',numbersOfExibtionItems,'perPageOption','Jogos exibidos: ')}
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Button.Group color={'grey'}>
                                <Button active={!this.state.currentViewMode} onClick={this.selectViewMode}>
                                    <Icon name='list layout' />
                                </Button>
                                <Button active={this.state.currentViewMode} onClick={this.selectViewMode}>
                                    <Icon name='grid layout' />
                                </Button>
                            </Button.Group>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>
            </Grid.Row>
        )
    }

    render () {
        return (
            <div>
            <Container>
                <Grid>
                    {this.getMenuFilters(true, "tablet mobile")}
                    {this.getMenuFilters(false,"computer")}

                    <LoadingAnimation hasLoading={this.state.hasLoading} />

                    <Grid.Row>
                        <Container>
                            <GameList modeView={this.state.visible} games={this.state.games} />
                        </Container>
                    </Grid.Row>

                    <Grid.Row centered>
                        <Paginator callbackParent={(stateName, option) => this.optionChanged('pageOption', option)}
                            infoPagination = {this.state.infoPagination}
                            pageOption={this.state.pageOption}
                        />
                    </Grid.Row>
                </Grid>
            </Container>
            </div>
        )
    }
}

GamesPage.propTypes = {
    match: PropTypes.object.isRequired,
}
