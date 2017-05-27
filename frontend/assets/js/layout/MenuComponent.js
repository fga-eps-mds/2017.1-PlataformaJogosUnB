import React from 'react';
import { Link } from 'react-router-dom'
import { Menu, Segment, Icon, Input, Container } from 'semantic-ui-react'
import {browserHistory} from 'react-router';


export default class MenuComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = { activeItem: 'index' };
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
      <Segment inverted stackable container>
        <Container>
          <Menu stackable container inverted pointing secondary>
            <Menu.Item as={ Link } name='index' to='/' active={activeItem === 'index'}>Index</Menu.Item>
            <Menu.Item as={ Link } name='games' to='/games/' active={activeItem === 'games'}>Jogos</Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input className='icon' placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>
      </Segment>
      </div>
    );
  }
}
