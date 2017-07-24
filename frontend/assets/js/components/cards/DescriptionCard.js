import React from "react";
import PropTypes from 'prop-types';
import {Card} from "semantic-ui-react";

export default class DescriptionCard extends React.Component {

    getAwards(awards){
        if(awards.length > 0) {
            return (<Card.Content header='Prêmios' description={awards}/>)
        } else {
            return null
        }
    }

    getDescription(title, description){
        if(description!=null){
            return (<Card.Content header={title} description={description} />)
        } else {
            return (<Card.Content header={title} description='Não há descrição cadastrada para esse jogo.' />)
        }
    }
    render () {
        const awards = (this.props.awards.map((award, i) =>
                            <p key={i}>
                                {this.props.getFields('Nome do Prêmio: ', award.name, ' - ',null)}
                                {this.props.getFields('Ano: ', award.year, ' - ',null)}
                                {this.props.getFields('Colocação: ', award.place, '',null)}
                            </p>
                        ))

        return (
            <Card fluid>
                {this.getDescription('Descrição', this.props.description)}
                <Card fluid>
                    {this.getAwards(awards)}
                </Card>
            </Card>
        );
    }
}

DescriptionCard.propTypes = {
    awards: PropTypes.array.isRequired,
    description: PropTypes.array.isRequired,
    getFields: PropTypes.func.isRequired,
}