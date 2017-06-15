import React from "react";
import {Link} from "react-router-dom";
import {Dropdown} from "semantic-ui-react";
import {dataListApi} from '../resource/DataListApi';

export default class Genres extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
           "genres":[],
        };
    }

    componentWillMount () {

        dataListApi("/api/genres/", (genres) => {

            this.setState({genres});

        });

    }

    mountGenreItems(){
        if(typeof this.state.genres === "undefined"){
            return false
        }
        return this.state.genres.map( (genre) => {
            return (
                    <Dropdown.Item 
                        text={genre.name}
                        as={Link}
                        to={`/filter/${genre.name}`}
                        params={{"genre":genre.name}} />
            );}
        );
    }

    render (){
        return(
            <Dropdown text='Categorias'>
                        <Dropdown.Menu>
                            {this.mountGenreItems()}
                        </Dropdown.Menu>
            </Dropdown>
        );
    }

}
