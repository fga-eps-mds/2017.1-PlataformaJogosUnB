import React from "react";
import { Menu, Icon } from "semantic-ui-react";

export default class Paginator extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            activeItem: '1'
        }
        this.handleItemClick = this.handleItemClick.bind(this) 
    }

    handleItemClick(e, {name}) { 
        this.setState({ activeItem: name })
    } 

    render(){
        const { activeItem } = this.state;
        return (
            <Menu borderless>
                <Menu.Item name='left'>
                    <Icon name='left chevron' />
                </Menu.Item>
                <Menu.Item name='1' active={activeItem === '1'} onClick={this.handleItemClick} />
                <Menu.Item name='2' active={activeItem === '2'} onClick={this.handleItemClick} />
                <Menu.Item name='right'>
                    <Icon name='right chevron' />
                </Menu.Item>
            </Menu>
      );
    }
  }
