import React, {PropTypes} from "react";
import {Card, Button, Grid, Icon} from "semantic-ui-react";
import ReportBugForm from '../forms/ReportBugForm';

export default class PackageCard extends React.Component {
    
    render () {
        
        return (
            <Card fluid>
                <Card.Content header="Reportar Bug"/>
                <Card.Content>
                    <Grid centered size='large'>
                      <ReportBugForm
                        button={
                           <Button basic color="red">
                             <Button.Content visible>
                               <Icon name="bug" />
                             </Button.Content>
                           </Button>
                        } 
                        game_pk={this.props.game_pk}
                     />
                    </Grid>
                </Card.Content>
                <Card.Content extra/>
            </Card>
        );
    }
}

PackageCard.propTypes = {
    game_pk: PropTypes.number.isRequired,
}