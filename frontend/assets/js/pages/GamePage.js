import React, {PropTypes} from "react";
import { Card, Grid, Container, Button, Icon } from 'semantic-ui-react'
import InternalSlide from "../layout/InternalSlide";
import GameInformationCard from '../components/cards/GameInformationCard';
import DescriptionCard from '../components/cards/DescriptionCard';
import DevelopersCard from '../components/cards/DevelopersCard';
import PackageCard from '../components/cards/PackageCard';
import Comment from '../components/Comments';
import ReportBugForm from '../components/forms/ReportBugForm.js';
import SegmentTitle from "../layout/SegmentTitle";

const reportBugButtonStyle = {
      "float": "right",
};

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
        this.getFields = this.getFields.bind()
    }

    getFields (title,value) {
        if (value != null) {
            return <p><strong>{title}</strong>{value}</p>;
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
                      <div style={reportBugButtonStyle}>
                         <ReportBugForm
                           button={
                             <Button animated="vertical" color="red">
                               <Button.Content hidden>Reportar bug</Button.Content>
                               <Button.Content visible>
                                 <Icon name="shop" />
                               </Button.Content>
                             </Button>
                           } 
                           game_pk={this.state.game.pk}
                         />
                      </div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
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

GamePage.propTypes = {
    match: PropTypes.object.isRequired,
}
