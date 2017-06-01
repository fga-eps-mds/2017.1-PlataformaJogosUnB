import React from "react";
import {Card, Grid, Image} from "semantic-ui-react";

export default class AboutCardComponent extends React.Component {

    render () {

        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {this.props.title}
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        <Grid centered columns={this.props.sizeGrid} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    {this.props.description}
                                </Grid.Column>
                                <Grid.Column>
                                    <Image centered size="medium" src={this.props.image} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Description>
                </Card.Content>
            </Card>
        );

    }
}
