import React from "react";
import SegmentTitle from "../layout/SegmentTitle";
import {Container, Grid, Menu} from "semantic-ui-react";
import GameList from "../components/GameList";
import SortByItems from "../components/SortByItems";

export default class GamesPage extends React.Component {
    
    constructor (){
        super();
        this.state = {
            "sortByOption": 'none'
        }
    }

    sortByOptionChanged(option){
        this.setState({ sortByOption: option });
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
                        </Menu>
                    </div>
                    <Grid.Row>
                        <GameList sortByOption={this.state.sortByOption}/>
                    </Grid.Row>
                </Grid>
            </Container>
        );

    }
}
