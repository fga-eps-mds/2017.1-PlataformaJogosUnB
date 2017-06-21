import React from "react";
import SegmentTitle from "../layout/SegmentTitle";
import {Container, Grid, Menu} from "semantic-ui-react";
import GameList from "../components/GameList";
import SortByItems from "../components/filter_itens/SortByItems";
import GenreItems from "../components/filter_itens/GenreItems";
import PlatformItems from "../components/filter_itens/PlatformItems";
export default class GamesPage extends React.Component {

    constructor (){
        super();
        this.state = {
            "sortByOption": 'none',
            "genreOption": '',
            "platformOption": '',
            "getGenreInUrlLimit": 0
        }
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

    render () {
        const urlGenre = this.genreOptionWillUpdate(); 
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
                                <GenreItems genre = {urlGenre} callbackParent={(option) => this.genreOptionChanged(option)} />
                            </Menu.Item>
                            <Menu.Item>
                                <PlatformItems callbackParent={(option) => this.platformOptionChanged(option)} />
                            </Menu.Item>
                        </Menu>
                    </Grid.Row>

                    <Grid.Row>
                        <GameList sortByOption={this.state.sortByOption} genreOption={this.state.genreOption} platformOption={this.state.platformOption}/>
                    </Grid.Row>
                </Grid>
            </Container>
        );

    }
}
