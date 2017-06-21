import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'
import {gameListApi} from '../resource/GameApi';

export default class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.resetComponent = this.resetComponent.bind(this)
        this.handleResultSelect = this.handleResultSelect.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    componentWillMount() {

      gameListApi((games) => {
            var listGame = games.map((game) => ({
                gamePk: game.pk,
                title: game.name,
                description: game.information.genres[0].name,
                image: game.cover_image,
                price: (game.information.semester+'/'+game.information.launch_year),
                gameDescription: game.information.description
            }));
            this.setState({listGame});
        });
        this.resetComponent()
    }

    resetComponent() {
        this.setState({ isLoading: false, results: [], value: '' })
    }

    handleResultSelect(e, result) {
        this.setState({ value: result.title })
        window.location = `/games/${result.gamePk}/${result.title}`;
    }

    handleSearchChange(e, value) {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => {
                return (re.test(result.title) || re.test(result.gameDescription))
            }

            this.setState({
                isLoading: false,
                results: _.filter(this.state.listGame, isMatch),
            })

            const MAXLIMIT = 5;
            var firstFiveGames = []; 
            for (var i = 0; i < this.state.results.length; i++) {
                if (i < MAXLIMIT) {
                    firstFiveGames.push(this.state.results[i]);
                } else {
                    
                    break;
                }
            }
            this.setState({firstFiveGames})

        }, 500)
    }

    render() {
        const { isLoading, value, firstFiveGames } = this.state

        return (
            <Grid>
                <Grid.Column width={8}>
                    <Search
                        size='small'
                        placeholder='Pesquisar...'
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={firstFiveGames}
                        value={value}
                        {...this.props}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}
