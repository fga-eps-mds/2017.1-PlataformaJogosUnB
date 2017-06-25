import React, {PropTypes} from "react";
import {Dropdown} from "semantic-ui-react";

export default class PerPageItems extends React.Component{

    constructor (props){
        super(props);
        this.state = {
            "name": "Jogos exibidos: 16",
            "perPageNumber": 16
        }
    }

    listDropdownItems(){
        const items = [{
            name: "Jogos exibidos: 4",
            number: 4
        },{
            name: "Jogos exibidos: 8",
            number: 8
        },{
            name: "Jogos exibidos: 12",
            number: 12
        },{
            name: "Jogos exibidos: 16",
            number: 16
        },{
            name: "Jogos exibidos: 20",
            number : 20
        }]
        const listDropItems = items.map((item, index) =>
            <Dropdown.Item key={index} onClick={(e) => this.handleClick(item, e)}>
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
            <Dropdown text={this.state.name}>
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
