import React from 'react';
import { Card } from 'semantic-ui-react';


export default class AboutCardComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            title: null,
            description: null,
        };
    }

    render(){ 

        return (
                <Card>
                    <Card.Content>
                        <Card.Header>
                            {this.state.title}
                        </Card.Header>
                        <Card.Description>
                            {this.state.description}
                        </Card.Description>
                    </Card.Content> 
                </Card>
        );
    }
}
