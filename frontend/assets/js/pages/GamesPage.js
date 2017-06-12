import React from "react";
import SegmentTitle from "../layout/SegmentTitle";
import {Container, Grid, Menu} from "semantic-ui-react";
import GameList from "../components/GameList";
import SortByItems from "../components/SortByItems";
import GenreItems from "../components/GenreItems";

export default class GamesPage extends React.Component {

    constructor (){
        super();
        this.state = {
            "sortByOption": 'none',
            "genreOption": ''
        }
    }

    sortByOptionChanged(option){
        this.setState({ sortByOption: option });
    }

    genreOptionChanged(option){
        this.setState({ genreOption: option })
    }

    render () {

        return (
            <Container>
                <SegmentTitle title={'Lista de Jogos'} />
                <Grid>
                    <Grid.Row>
                        <Segment padded inverted color="brown">
                            <h1>Lista de jogos</h1>
                        </Segment>
                    </Grid.Row>
                    <div>
                        <Menu inverted>
                            <Menu.Item>
                                <SortByItems callbackParent={(option) => this.sortByOptionChanged(option)}/>
                            </Menu.Item>
                            <Menu.Item>
                                <GenreItems callbackParent={(option) => this.genreOptionChanged(option)} />
                            </Menu.Item>
                        </Menu>
                    </div>
                    <Grid.Row>
                        <GameList sortByOption={this.state.sortByOption} genreOption={this.state.genreOption}/>
                    </Grid.Row>
                </Grid>
            </Container>
        );

    }
}
