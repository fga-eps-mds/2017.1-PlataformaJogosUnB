import React from "react";
import {Dropdown} from "semantic-ui-react";

export default class SortByItems extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            "name": "Ordernar por"
        }
    }

    listDropdownItens(listItens){
        const rule = [{
            name: 'Nome (A-Z)',
            order: 'frontToBack',
            param: '.name',
        },{
            name: 'Nome (Z-A)',
            order: 'backToFront',
            param: '.name',
        },{
            name: 'Mais antigo',
            order: 'frontToBack',
            param: '.information.launch_year',
        },{
            name: 'Mais recente',
            order: 'backToFront',
            param: '.information.launch_year',
        }]
        const listDropItens = rule.map((item) =>
                <Dropdown.Item onClick={(e) => this.handleClick(item, e)}>
                    {item.name}
                </Dropdown.Item>
        );
        return listDropItens;
    }

    handleClick(item){
        const option = item;
        this.setState({ name: item.name });
        this.props.callbackParent(option);
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
