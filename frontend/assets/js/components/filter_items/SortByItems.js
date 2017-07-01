import React from "react";
import PropTypes from "prop-types";
import {Dropdown} from "semantic-ui-react";

export default class SortByItems extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            "name": "Ordernar por"
        }
    }

    listDropdownItens(){
        const rule = [{
            name: 'Nome (A-Z)',
            param: 'name',
        },{
            name: 'Nome (Z-A)',
            param: '-name',
        },{
            name: 'Mais recente',
            param: '-information__launch_year',
        },{
            name: 'Mais antigo',
            param: 'information__launch_year',
        }]
        const listDropItens = rule.map((item, i) =>
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
            <Dropdown text={this.state.name} defaultValue='Ordernar por'>
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
