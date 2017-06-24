import React from 'react';
import GamesPage from '../../assets/js/pages/GamesPage';
import SegmentTitle from '../../assets/js/layout/SegmentTitle';
import SortByItems from '../../assets/js/components/filter_itens/SortByItems';
import GenreItems from '../../assets/js/components/filter_itens/GenreItems';
import PlataformItems from '../../assets/js/components/filter_itens/PlataformItems';
import PerPageItems from '../../assets/js/components/filter_itens/PerPageItems';
import Paginator from '../../assets/js/components/Paginator';
import {Container, Grid, Menu, Button, Icon} from "semantic-ui-react";
import renderer from 'react-test-renderer';

test('Test render GamesPage', () => {
  const component = renderer.create(
      <Container>
          <Grid>
              <Grid.Row>
                  <SegmentTitle title={'Lista de Jogos'} />
              </Grid.Row>

              <Grid.Row>
                  <Menu fluid inverted color='blue'>
                      <Menu.Item>
                          <SortByItems callbackParent={(stateName, option) => this.optionChanged('sortByOption', option)}/>
                      </Menu.Item>
                      <Menu.Item>
                          <GenreItems callbackParent={(stateName, option) => this.optionChanged('genreOption', option)} />
                      </Menu.Item>
                      <Menu.Item>
                          <PlatformItems callbackParent={(stateName, option) => this.optionChanged('platformOption', option)} />
                      </Menu.Item>
                      <Menu.Item>
                          <PerPageItems callbackParent={(stateName, option) => this.optionChanged('perPageOption', option)} />
                      </Menu.Item>
                      <Menu.Item position='right'>
                          <Button.Group>
                              <Button onClick={this.selectViewMode}><Icon name='list layout' width='40' heigth='40' /></Button>
                              <Button onClick={this.selectViewMode}><Icon name='grid layout' /></Button>
                          </Button.Group>
                      </Menu.Item>
                  </Menu>
              </Grid.Row>

              <Grid.Row>
                  <GameList modeView={this.state.visible}  games={this.state.games}/>
              </Grid.Row>
              <Grid.Row centered>
                  <Paginator callbackParent={(stateName, option) => this.optionChanged('pageOption', option)}
                      infoPagination = {this.state.infoPagination}
                      pageOption={this.state.pageOption}/>
              </Grid.Row>
          </Grid>
      </Container>
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
