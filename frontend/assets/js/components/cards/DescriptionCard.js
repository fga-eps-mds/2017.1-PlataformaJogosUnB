import React, {PropTypes} from "react";
import {Card} from "semantic-ui-react";

export default class DescriptionCard extends React.Component {
    render () {

        return (
            <Card fluid>
                <Card.Content header='Descrição' description={this.props.description} />
                <Card fluid>
                    <Card.Content header='Prêmios' description={this.props.awards.map((award) =>                        
                        <div>
                            {this.props.getFields("Nome do Prêmio: ", award.name)} 
                            {this.props.getFields('Ano: ',award.year)}
                            {this.props.getFields('Colocação:', award.place)}
                        </div>
                    )} />
                </Card>
            </Card>
        );
    }
}

DescriptionCard.propTypes = {
    description: PropTypes.string.isRequired,
    award: PropTypes.object.isRequired,
    awards: PropTypes.array.isRequired,
    getFields: PropTypes.func.isRequired,
}