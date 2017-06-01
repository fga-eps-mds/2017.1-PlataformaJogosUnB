import React from "react";
import InformationCard from "./cards/InformationCard.js";
import DescriptionCard from "./cards/DescriptionCard.js";
import InternalSlider from "../layout/InternalSlide.js";
import {Card, Grid} from "semantic-ui-react";

export default class Game extends React.Component {
    constructor (props) {

        super(props);
        this.state = {
            "game": {
                "information": {"developers": []},
                "genres": [],
                "packages": []
            }
        };

    }

    loadGameFromServer () {

        console.log(this.props);
        const id = this.props.match.params.id;

        console.log(id);
        fetch(`/api/detail/${id}/`,
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

    render () {

        return (
            <div>
                <h1>{this.state.game.name} </h1>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <InternalSlider />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <DescriptionCard
                                version={this.state.game.version}
                                official_repository={this.state.game.official_repository}
                                launch_year={this.state.game.information.launch_year}
                                developers={this.state.game.information.developers}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );

    }
}
