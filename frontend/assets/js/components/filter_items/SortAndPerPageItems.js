import React, {PropTypes} from "react";
import {Dropdown} from "semantic-ui-react";

export default class SortAndPerPageItems extends React.Component{

    constructor (props){
        super(props);
        this.state = {
            "option": props.optionDefault,
        }
    }

    listDropdownItems(items){
        const listDropItems = items.map((item, index) =>
            <Dropdown.Item
                key={index}
                text={item.option}
                icon={item.icon}
                onClick={(e) => this.handleClick(item, e)}
            />
        )
        return listDropItems;
    }

    handleClick(item){
        this.setState({ option: item.option })
        this.props.callbackParent(this.props.selectOption, item.param)
    }

    render(){
        return(
            <Dropdown text={this.props.textDropbox + this.state.option} pointing>
                <Dropdown.Menu>
                    {this.listDropdownItems(this.props.items)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

SortAndPerPageItems.propTypes = {
    items: PropTypes.array.isRequired,
    callbackParent: PropTypes.func.isRequired,
    optionDefault: PropTypes.string.isRequired,
    selectOption: PropTypes.string.isRequired,
    textDropbox: PropTypes.string.isRequired
}
