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
        this.props.callbackParent(parseInt(name))
    } 

    componentWillRecieveProps(nextProps){
        if(thi.pros.infoPagination != nextProps.infoPagination){
            this.getListItems(nextProps.infoPagination);
        } else{
            return false;
        }
    }

    componentDidMount(){
        this.getListItems(this.props.infoPagination);
    }

    getListItems(range){
        const { activeItem } = this.state;
        var listItems = []
        for(var i = range.range_start; i <= range.range_end; i++){
            listItems.push(
                <Menu.Item  name={i.toString()} active={activeItem === i.toString()} onClick={this.handleItemClick} />
            );
        }
        return listItems
    }

    render(){
        const { activeItem } = this.state;
        var left_hand = '';
        if(this.state.activeItem > '1'){
            left_hand = parseInt(this.state.activeItem) - 1;
            left_hand = left_hand.toString();
        } else{
            left_hand = '1';
        }
        return (
            <Menu pagination borderless inverted >
                <Menu.Item name='left' name={left_hand}  onClick={this.handleItemClick}>
                    <Icon name='angle left' />
                </Menu.Item>
                {this.getListItems(this.props.infoPagination)}
                <Menu.Item name='right'>
                    <Icon name='angle outline right' />
                </Menu.Item>
            </Menu>
      );
    }
  }
