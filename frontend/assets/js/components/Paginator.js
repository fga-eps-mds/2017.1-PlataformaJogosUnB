import React from "react";
import PropTypes from "prop-types";
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
        this.props.callbackParent('pageOption', parseInt(name))
    } 


    componentDidMount(){
        this.getListItems(this.props.infoPagination);
    }

    componentWillUpdate(nextProps){
        if(this.props.pageOption != nextProps.pageOption){
            const selectedPage = nextProps.pageOption.toString();
            this.setState({ activeItem: selectedPage});
        } else{
            return false;
        }
    }

    getListItems(range){
        const { activeItem } = this.state;
        var listItems = []
        for(var i = range.range_start; i <= range.range_end; i++){
            listItems.push(
                <Menu.Item key={i} name={i.toString()} active={activeItem === i.toString()} onClick={this.handleItemClick} />
            );
        }
        return listItems
    }

    getArrows(nameArrow,angle){
       return(
            <Menu.Item name={nameArrow} onClick={this.handleItemClick}>
                <Icon name={angle} />
            </Menu.Item>
	)
    }

    render(){
        var left_arrow = '';
        var right_arrow = '';
        if(this.state.activeItem > '1'){
            left_arrow = parseInt(this.state.activeItem) - 1;
            left_arrow = left_arrow.toString();
        } else{
            left_arrow = '1';
        }
        if(this.state.activeItem < this.props.infoPagination.range_end){
            right_arrow = parseInt(this.state.activeItem) + 1;
            right_arrow = right_arrow.toString();
        } else{
            right_arrow = this.state.activeItem.toString();
        }
        return (
            <Menu pagination borderless inverted >
            {this.getArrows(left_arrow,'angle left')}
                {this.getListItems(this.props.infoPagination)}
                {this.getArrows(right_arrow,'angle right')}
            </Menu>
      );
    }
  }

Paginator.propTypes = {
    callbackParent: PropTypes.func.isRequired,
    infoPagination: PropTypes.object.isRequired,
    pageOption: PropTypes.number.isRequired,
}
