import React from 'react';
import SearchBox from '../../assets/js/components/SearchBox'
import {Container, Grid, Header, Menu, Segment, Sidebar, Icon} from "semantic-ui-react";
import renderer from 'react-test-renderer';
var expect = required('expect');

test('Test render MenuLayout', () => {
    const activeItem = null;
  const component = renderer.create(

      <div>
                <Grid>
                    <Grid.Row only="tablet mobile">
                        <Grid.Column>
                            <Sidebar.Pusher>
                                <Sidebar as={Menu} animation="overlay" width="wide" visible="visible" vertical inverted onClick="active">
                                    <Menu.Item as="link" to="/" active={activeItem === "/"}><Header inverted>Home</Header></Menu.Item>
                                    <Menu.Item as="link" to="/games/" active={activeItem === "/games/"}><Header inverted>Jogos</Header></Menu.Item>
                                    <Menu.Item as="link" to="/about/" active={activeItem === "/about/"}><Header inverted>Sobre</Header></Menu.Item>
                                </Sidebar>
                                <Segment inverted>
                                    <Menu inverted pointing secondary>
                                        <Icon name='bars' size='big' onClick="active" />
                                    </Menu>
                                </Segment>
                            </Sidebar.Pusher>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row only="computer large">
                        <Grid.Column>
                            <Segment inverted stackable container>
                                <Menu inverted pointing secondary>
                                    <Container>
                                        <Menu.Item as="link" to="/" active={activeItem === "/"}><Header inverted>Home</Header></Menu.Item>
                                        <Menu.Item as="link" to="/games/" active={activeItem === "/games/"}><Header inverted>Jogos</Header></Menu.Item>
                                        <Menu.Item as="link" to="/about/" active={activeItem === "/about/"}><Header inverted>Sobre</Header></Menu.Item>
                                        <Menu.Menu position='right'>
                                            <Menu.Item>
                                                <SearchBox />
                                            </Menu.Item>
                                        </Menu.Menu>
                                    </Container>
                                </Menu>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>

      );



  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
