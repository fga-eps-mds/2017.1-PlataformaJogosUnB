import React from 'react';
import { Card } from 'semantic-ui-react';


export default class AboutCardComponent extends React.Component {

    render(){ 

        return (
            <Card>
                <Card.Content>
                    <Card.Header>
                        {this.props.title}
                    </Card.Header>
                    <Card.Description>
                        {this.props.description}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}
