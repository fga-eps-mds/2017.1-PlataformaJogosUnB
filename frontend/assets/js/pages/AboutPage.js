import React from 'react';
import AboutCardComponent from '../layout/AboutCardComponent';
import { Grid } from 'semantic-ui-react';


export default class AboutPage extends React.Component{

    render(){
        return(
            <Grid centered columns={2}>
                <Grid.Row>
                    <Grid.Column floated='left'>
                        <AboutCardComponent />
                    </Grid.Column>
                    <Grid.Column floated='right'>
                        <AboutCardComponent />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
