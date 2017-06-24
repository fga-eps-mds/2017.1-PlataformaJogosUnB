import React, {PropTypes} from "react";
import {Dropdown} from "semantic-ui-react";
import {itemsPerPageItems} from "../../resources/styleSheetConstants";
export default class PerPageItems extends React.Component{

    constructor (props){
        super(props);
        this.state = {
            "name": "Games per page: 16",
            "perPageNumber": 16
        }
    }

    listDropdownItems(){
        const listDropItems = itemsPerPageItems.map((item) =>
            <Dropdown.Item onClick={(e) => this.handleClick(item, e)}>
                {item.name}
            </Dropdown.Item>
        );
        return listDropItems;
    }

    handleClick(item){
        const option = item.number;
        this.setState({ name: item.name })
        this.setState({ perPageNumber: item.number })
        this.props.callbackParent('perPageOption', option)
    }

    render(){
        return(
            <Dropdown text={this.state.name} selection>
                <Dropdown.Menu>
                    {this.listDropdownItems()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

PerPageItems.propTypes = {
    callbackParent: PropTypes.func.isRequired
}
