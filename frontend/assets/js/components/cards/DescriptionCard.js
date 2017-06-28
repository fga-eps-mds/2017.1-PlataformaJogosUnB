import React from "react";
import PropTypes from 'prop-types';
import {Card} from "semantic-ui-react";

export default class DescriptionCard extends React.Component {
    
    getAwards(awards){
        console.log(awards)
        if (awards.length > 0) {
            return (<Card.Content header='Prêmios' description={awards}/>)
        } else {
            return null
        }
    }

    render () {
        const awards = (this.props.awards.map((award, i) =>
                        <p key={i}>
                            {this.props.getFields('Nome do Prêmio: ', award.name, ' - ')}
                            {this.props.getFields('Ano: ', award.year, ' - ')}
                            {this.props.getFields('Colocação: ', award.place, '')}
                        </p>
                    ));

        return (
            <Card fluid>
              <Card.Content header='Descrição' description={this.props.description} />
                <Card fluid>
                {this.getAwards(awards)}
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
