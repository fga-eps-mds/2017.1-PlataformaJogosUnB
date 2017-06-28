import React from "react";
import PropTypes from "prop-types";
import {Dropdown} from "semantic-ui-react";
import {dataListApi} from "../../resources/DataListApi";

export default class GenreItems extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            "genres":[],
            "selectedGenre":this.props.genre
        };
    }

    componentWillMount () {

        dataListApi("/api/genres/", (genres) => {

            this.setState({genres});

        });

    }

    handleClick(genreName){
        const option = genreName;
        if(genreName === ''){
            genreName = "Todas as categorias"
        }
        this.setState({ selectedGenre: genreName });
        this.props.callbackParent('genreOption', option);
    }
    
    mountGenreItems(){
        if(typeof this.state.genres === "undefined"){
            return false
        }
        const gameGenresItems = this.state.genres.map((genre, i) =>
                <Dropdown.Item key={i} onClick={(e) => this.handleClick(genre.name, e)}>
                    {genre.name}
                </Dropdown.Item>
        );
        return gameGenresItems

    }
        
    render (){
        return(
            <Dropdown text={this.state.selectedGenre}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.handleClick('', e)}>
                        Todas as categorias
                    </Dropdown.Item>
                    {this.mountGenreItems()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

GenreItems.propTypes = {
  callbackParent: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired
}
