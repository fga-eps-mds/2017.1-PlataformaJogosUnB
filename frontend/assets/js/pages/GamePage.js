import React, {PropTypes} from "react";
import { Card, Grid, Container} from 'semantic-ui-react'
import InternalSlide from "../layout/InternalSlide";
import GameInformationCard from '../components/cards/GameInformationCard';
import DescriptionCard from '../components/cards/DescriptionCard';
import DevelopersCard from '../components/cards/DevelopersCard';
import PackageCard from '../components/cards/PackageCard';
import ReportBugCard from '../components/cards/ReportBugCard';
import Comment from '../components/Comments';
import SegmentTitle from "../layout/SegmentTitle";

export default class GamePage extends React.Component{
    constructor (props) {

        super(props);
        this.state = {
            "game": {
                "media_image":[],
                "media_video": [],
                "information": {
                    "credits": [],                 
                    "awards": [],
                    "genres": [],
                    "packages": []
                }
            }
        };
        this.getFields = this.getFields.bind()
    }

    getFields (title,value,divider) {
        if (value != null) {
            return <h7><strong>{title}</strong>{value}{divider}</h7>;
        }
        return null;
    }

  loadGameFromServer(){
    const id = this.props.match.params.id;

        fetch("/api/games/"+id+"/",
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
                            media_image={this.state.game.media_image}
                            media_video={this.state.game.media_video}
                        />
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <GameInformationCard
                            cover_image={this.state.game.cover_image}
                            version={this.state.game.version}
                            official_repository={this.state.game.official_repository}
                            launch_year={this.state.game.information.launch_year}
                            genres={this.state.game.information.genres}
                            getFields={this.getFields}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={10}>
                        <DescriptionCard
                            description={this.state.game.information.description}
                            awards={this.state.game.information.awards}
                            getFields={this.getFields}
                        />
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <PackageCard
                            packages={this.state.game.packages}
                            game_pk={this.state.game.pk}
                            gameName={this.state.game.name}
                        />
                        <ReportBugCard
                            game_pk={this.state.game.pk}
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
                                credits={this.state.game.information.credits}
                                awards={this.state.game.information.awards}
                            />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
  }
}

GamePage.propTypes = {
    match: PropTypes.object.isRequired,
}
