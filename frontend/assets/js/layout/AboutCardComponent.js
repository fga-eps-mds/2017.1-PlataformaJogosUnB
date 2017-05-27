import React from 'react'
import { Card } from 'semantic-ui-react'

class AboutCard extends React.Component {

    const description = 'A plataforma de jogos UnB Games oferece dezenas de jogos para o seu entertenimento.'
    

    render(){
        return (
            <div>
                <Card>
                    <Card.Content>
                        <Card.Header>
                            UnB Games
                        </Card.Header>
                        <Card.Description>
                            {description}
                        </Card.Description>
                    </Card.Content> 
                </Card>
            </div>
        );
    }
}
