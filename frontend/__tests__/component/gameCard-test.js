import React from 'react';
import DescriptionCard from '../../assets/js/components/cards/DescriptionCard';
import {Card} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render DescriptionCard', () => {
  const component = renderer.create(
		<Card fluid>
    	<Card.Content header='Descrição' description="Descrição"/>
      <Card fluid>
      	<Card.Content header='Prêmios' description="Bla"/>
      </Card>
    </Card>
	);

  let tree = component.toJSON();		
  expect(tree).toMatchSnapshot();
});
