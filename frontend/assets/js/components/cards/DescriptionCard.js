import React from "react";
import {Card} from "semantic-ui-react";

export default class DescriptionCard extends React.Component {
    getFields (title,value) {
        if (value != null) {
            return <div><strong>{title}</strong>{value}</div>;
        }
        return null;
    }

    render () {

        return (
            <Card fluid>
                <Card.Content header="Descrição" description={this.props.description} />
                <Card fluid>
                    <Card.Content header="Prêmios" description={this.props.awards.map((award) =>
                        
                        <div>{this.getFields("Nome do Prêmio: ", award.name)} - Ano: { award.year } - Colocação: { award.place }</div>
                    )} />
                </Card>
            </Card>
        );
    }
}

