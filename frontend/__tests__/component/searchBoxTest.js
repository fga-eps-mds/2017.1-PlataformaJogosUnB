import React from 'react';
import SearchBox from '../../assets/js/components/SearchBox';
import {Search, Grid} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render SearchBox', () => {
  const component = renderer.create(
      <Grid>
          <Grid.Column width={8}>
              <Search
                  size='small'
                  placeholder='Pesquisar...'
                  loading='false'

                  results={['game1','game2','game3','game4','game5']}
                  value= ''

              />
          </Grid.Column>
      </Grid>
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
