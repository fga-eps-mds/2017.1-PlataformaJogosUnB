import React from "react";
import {Dropdown} from "semantic-ui-react";
import {dataListApi} from '../resource/DataListApi';

export default class PlatformItems extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            "platforms":[],
            "selectedPlatform":'Plataforma'
        };
    }

    componentWillMount () {

        dataListApi("/api/platforms/", (platforms) => {

              this.setState({platforms});

          });

    }

    handleClick(genreName){
        const option = genreName;
        this.setState({ selectedGenre: genreName });
        this.props.callbackParent(option);
    }

    mountGenreItems(){
        if(typeof this.state.platforms === "undefined"){
            return false
        }
        const gamePlatformsItems = this.state.platforms.map((platform) =>
                <Dropdown.Item onClick={(e) => this.handleClick(platform.name, e)}>
                    {platform.name}
                </Dropdown.Item>
        );
        return gamePlatformsItems;

    }

    render (){
        return(
            <Dropdown text={this.state.selectedPlatform}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.handleClick('Todas categorias', e)}>
                        Todas plataformas
                    </Dropdown.Item>
                    {this.mountGenreItems()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
