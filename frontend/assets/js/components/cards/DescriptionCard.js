import React, {PropTypes} from "react";
import {Card} from "semantic-ui-react";

export default class DescriptionCard extends React.Component {
    render () {
        const awards = (this.props.awards.map((award) =>                        
                        <div>
                            {this.props.getFields("Nome do Prêmio: ", award.name)} 
                            {this.props.getFields('Ano: ', award.year)}
                            {this.props.getFields('Colocação:', award.place)}
                        </div>
                    ));

        return (
            <Card fluid>
              <Card.Content header='Descrição' description={this.props.description} />
                <Card fluid>
                <Card.Content header='Prêmios' description={awards}/>
                </Card>
            </Card>
        );
    }
}

DescriptionCard.propTypes = {
    description: PropTypes.string.isRequired,
    awards: PropTypes.array.isRequired,
    getFields: PropTypes.func.isRequired,
}
