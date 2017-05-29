import React from 'react';
import AboutCardComponent from '../layout/AboutCardComponent';
import { Grid, Card } from 'semantic-ui-react';


export default class AboutPage extends React.Component{

    render(){
        return(
            <Grid columns={1} padded='vertically'>
                <Grid.Row/ >
                <Grid.Row>
                    <Grid.Column>
                        <Card.Group itemsPerRow={1}>
                            <AboutCardComponent />
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row />
                <Grid.Row />
                <Grid.Row />
                <Grid.Row>
                    <Grid.Column>
                        <Card.Group itemsPerRow={2}>
                            <AboutCardComponent />
                            <AboutCardComponent />
                        </Card.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
