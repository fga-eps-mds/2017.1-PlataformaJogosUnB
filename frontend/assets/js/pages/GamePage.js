import React from "react";
import PropTypes from "prop-types";
import { Card, Grid, Container} from 'semantic-ui-react'
import InternalSlide from "../layout/InternalSlide";
import GameInformationCard from '../components/cards/GameInformationCard';
import DescriptionCard from '../components/cards/DescriptionCard';
import DevelopersCard from '../components/cards/DevelopersCard';
import PackageCard from '../components/cards/PackageCard';
import ReportBugCard from '../components/cards/ReportBugCard';
import Comment from '../components/Comments';
import SegmentTitle from "../layout/SegmentTitle";
import Rating from '../components/Rating';

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

  getInternalSlide(){
    return (
         <InternalSlide
            media_image={this.state.game.media_image}
            media_video={this.state.game.media_video}
         />
    )
  }

  getGameInformationCard(){
    return (
         <GameInformationCard
            cover_image={this.state.game.cover_image}
            version={this.state.game.version}
            official_repository={this.state.game.official_repository}
            launch_year={this.state.game.information.launch_year}
            genres={this.state.game.information.genres}
            getFields={this.getFields}
         />
    ) 
  }
  getDescriptionCard(){
    return (
        <DescriptionCard
            description={this.state.game.information.description}
            awards={this.state.game.information.awards}
            getFields={this.getFields}
        />
    )
  }

  getPackageCard(){
    return (
        <PackageCard
            packages={this.state.game.packages}
            game_pk={this.state.game.pk}
            gameName={this.state.game.name}
            downloads={this.state.game.downloads}
        />
    )
  }

  getDevelopersCard(){
    return (
        <DevelopersCard
            credits={this.state.game.information.credits}
            awards={this.state.game.information.awards}
        />
    )
  }

  getComment(id){
    return (
        <Card fluid>
            <Card.Content>
                <Comment url={"unbgames.lappis.rocks/games/" + id} />
            </Card.Content>
        </Card>
    )
  }

  getWeb(id){
    return (
            <Grid>
                <Grid.Row only='computer'>
                    <Grid.Column width={10}>
                        {this.getInternalSlide()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        {this.getGameInformationCard()}
                        <Rating pk={id} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row only='computer'>
                    <Grid.Column width={10}>
                        {this.getDescriptionCard()}
                    </Grid.Column>

                    <Grid.Column width={6}>
                        {this.getPackageCard()}
                        <ReportBugCard
                            game_pk={this.state.game.pk}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row only='computer'>
                    <Grid.Column width={10}>
                        {this.getComment(id)}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {this.getDevelopersCard()}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    )
  }

  getMobile(id){
      return(
            <Grid>
                <Grid.Row only='tablet mobile'>
                    {this.getInternalSlide()}
                </Grid.Row>
                
                <Grid.Row only='tablet mobile'>
                    {this.getGameInformationCard()}
                    <Rating pk={id} />
                </Grid.Row>

                <Grid.Row only='tablet mobile'>
                    {this.getDescriptionCard()}
                </Grid.Row>

                <Grid.Row only='tablet mobile'>
                    {this.getPackageCard()}
                    <ReportBugCard
                        game_pk={this.state.game.pk}
                    />
                </Grid.Row>
                <Grid.Row only='tablet mobile'>
                        {this.getDevelopersCard()}
                </Grid.Row>
                <Grid.Row only='tablet mobile'>
                        {this.getComment(id)}
                </Grid.Row>
            </Grid>
      )
  }


  render(){
    const id = this.props.match.params.id;

    return (
        <Container>
            <SegmentTitle title={this.state.game.name} />
            {this.getWeb(id)}
            {this.getMobile(id)}
        </Container>
    );
  }
}

GamePage.propTypes = {
    match: PropTypes.object.isRequired,
}
