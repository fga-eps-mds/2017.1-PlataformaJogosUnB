import React from "react";
import {Card, Button, Grid} from "semantic-ui-react";
import ModalPackageCard from "./ModalPackageCard"

export default class PackageCard extends React.Component {

    render () {

        return (
            <Card fluid>
                <Card.Content header="Download"/>
                <Card.Content>
                    <Grid centered size='large'>
                        <Button.Group>
                            <ModalPackageCard 
                                button={<Button basic color='green'>Windows</Button>}
                                plataform={'Windows'}
                            />
                            <ModalPackageCard 
                                button={<Button basic color='green'>Linux</Button>}
                                plataform={'Linux'}
                                />
                            <ModalPackageCard 
                                button={<Button basic color='green'>Apple</Button>}
                                plataform={'Apple'}
                            />
                        </Button.Group>
                    </Grid>
                </Card.Content>
                <Card.Content extra/>
            </Card>
        );
    }
}