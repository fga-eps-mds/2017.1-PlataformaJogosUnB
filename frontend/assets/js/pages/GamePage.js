import React from 'react';
import {Card, Container, Grid} from "semantic-ui-react";
import GameInformationCard from '../components/cards/GameInformationCard';
import DevelopersCard from '../components/cards/DevelopersCard';
import DescriptionCard from '../components/cards/DescriptionCard';
import PackageCard from  '../components/cards/PackageCard';
import InternalSlide from "../layout/InternalSlide";
import Rating from '../components/Rating';
import SegmentTitle from "../layout/SegmentTitle";
import Comment from '../components/Comment';

export default class GamePage extends React.Component{
     constructor (props) {

        super(props);
        this.state = {
            "game": {
                "media_image": [],
                "information": {
                    "developers": [],
                    "awards": [],
                    "genres": [],
                    "packages": []
                }
            }
        };
        console.log("Props GamePage", this.props);

    }

  loadGameFromServer(){
    console.log(this.props);
    const id = this.props.match.params.id;

    console.log(id)
        fetch("/api/detail/"+id+"/",
              {
                headers: new Headers({ "Content-Type": "application/json", "Accept": "application/json"}),
                method: "GET",
              })
        .then((response) => {
             return response.json();
            })
        .then(((game) => {
            this.setState({ game: game });
        }).bind(this))
        .catch((error) => {
            console.error(error);
        });
  }

  componentDidMount() {
        this.loadGameFromServer();
  }

  render(){
    const id = this.props.match.params.id;

    return (
        <Container>
            <SegmentTitle title={this.state.game.name} />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <InternalSlide
                            data={this.state.game}
                        />
                        <Rating
                            pk={id}
                        />
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <GameInformationCard
                            cover_image={this.state.game.cover_image}
                            version={this.state.game.version}
                            official_repository={this.state.game.official_repository}
                            launch_year={this.state.game.information.launch_year}
                            genres={this.state.game.information.genres}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={10}>
                        <DescriptionCard
                            description={this.state.game.information.description}
                            awards={this.state.game.information.awards}
                        />
                    </Grid.Column>

                    <Grid.Column width={6}>    
                        <PackageCard
                            
                        />
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Comment url={"unbgames.lappis.rocks/games/" + id} />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={6}>    
                            <DevelopersCard
                                developers={this.state.game.information.developers}
                            />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
  }
}
