import React from 'react';
import DescriptionCard from '../../assets/js/components/Comments';
import FacebookProvider, { Comments } from 'react-facebook';
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render Comments', () => {
  const component = renderer.create(
		<div>
      <FacebookProvider appId="1850394608544081">
        <Comments href="unbgames.lappis.rocks/games/1" colorScheme={'dark'} width='100%' />
      </FacebookProvider>
    </div>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
