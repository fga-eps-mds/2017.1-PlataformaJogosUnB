import React, {PropTypes} from "react";
import {Dropdown} from "semantic-ui-react";
import {ruleSortByItems} from "../../resources/styleSheetConstants";

export default class SortByItems extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            "name": "Ordernar por"
        }
    }

    listDropdownItens(){
        const listDropItens = ruleSortByItems.map((item, i) =>
                <Dropdown.Item key={i} onClick={(e) => this.handleClick(item, e)}>
                    {item.name}
                </Dropdown.Item>
        );
        return listDropItens;
    }

    handleClick(item){
        const option = item.param;
        this.setState({ name: item.name });
        this.props.callbackParent('sortByOption', option);
    }

    render () {
        return (
            <Dropdown text={this.state.name} defaultValue='Ordernar por' selection>
                <Dropdown.Menu>
                    {this.listDropdownItens()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

}
SortByItems.propTypes = {
  callbackParent: PropTypes.func.isRequired
}
