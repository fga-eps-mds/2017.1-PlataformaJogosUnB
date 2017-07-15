import React from "react";
import PropTypes from "prop-types";
import {Dropdown} from "semantic-ui-react";
import {dataListApi} from "../../resources/DataListApi";

export default class Items extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            "option":[],
            "selectedOptionFilter": this.props.type,
        };
    }

    componentWillMount() {
        dataListApi(this.props.pathListApi, (option) => {
            this.setState({option})
        })
    }

    handleClick(optionName){
        const option = optionName;
        if(optionName === ''){
            optionName = this.props.text
        }
        this.setState({ selectedOptionFilter: optionName });
        this.props.callbackParent(this.props.selectOption, option);
    }

    mountItems(){
        if(typeof this.state.option === "undefined"){
            return false
        }
        const gameItems = this.state.option.map((option, i) =>
                <Dropdown.Item key={i} onClick={(e) => this.handleClick(option.name, e)}>
                    {option.name}
                </Dropdown.Item>
        )
        return gameItems

    }

    render(){
        return(
            <Dropdown text={this.state.selectedOptionFilter}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.handleClick('', e)}>
                        {this.props.text}
                    </Dropdown.Item>
                    {this.mountItems()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

Items.propTypes = {
  callbackParent: PropTypes.func.isRequired,
  option: PropTypes.string.isRequired,
  pathListApi: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selectOption: PropTypes.string.isRequired,
}
