import React from 'react';
import { Card } from 'semantic-ui-react';


export default class AboutCardComponent extends React.Component {


    render(){ 

        return (
            <div>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            UnB Games
                        </Card.Header>
                        <Card.Description>
                            A plataforma de jogos oficial da UnB
                        </Card.Description>
                    </Card.Content> 
                </Card>
            </div>
        );
    }
}
