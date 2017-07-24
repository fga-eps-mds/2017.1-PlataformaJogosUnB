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

        if(this.props.selectOption=='genreOption'){
            //Update url in GamesPage
            let url = ('/games/' + option)
            window.history.pushState('','Current URL',url)
        }
    }

    mountItems(){
        if(typeof this.state.option === "undefined"){
            return false
        } else {
            const gameItems = this.state.option.map((option, i) =>
                <Dropdown.Item
                    key={i}
                    text={option.name}
                    icon='tag'
                    onClick={(e) => this.handleClick(option.name, e)}
                />
            )
            return gameItems
        }
    }

    render(){
        return(
            <Dropdown text={'Filtrar por: ' + this.state.selectedOptionFilter} pointing>
                <Dropdown.Menu>
                    <Dropdown.Item
                        icon='tag'
                        text={this.props.text}
                        onClick={(e) => this.handleClick('', e)}
                    />
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
