import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid } from 'semantic-ui-react'

export default class SearchBox extends Component {
    loadGameFromServer () {
        fetch("/api/list/",
            {
                "headers": new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((games) => {
              this.setState({games});
          });
    }

    constructor(props) {
        super(props);
        this.resetComponent = this.resetComponent.bind(this)
        this.handleResultSelect = this.handleResultSelect.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
    }

    componentWillMount() {
        this.loadGameFromServer()
        this.resetComponent()
    }

    resetComponent() {
        this.setState({ isLoading: false, results: [], value: '' })
    }

    handleResultSelect(e, result) {
        this.setState({ value: result.name })
        window.location = `/games/${result.pk}`;
    }

    handleSearchChange(e, value) {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = (result) => re.test(result.name)

            this.setState({
                isLoading: false,
                results: _.filter(this.state.games, isMatch),
            })
        }, 500)
    }

    render() {
        const { isLoading, value, results } = this.state

        return (
            <Grid>
                <Grid.Column width={8}>
                    <Search
                        size='small'
                        placeholder='Search...'
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={this.handleSearchChange}
                        results={results}
                        value={value}
                        {...this.props}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}