import React from "react";
import {Link} from "react-router-dom";
import {Dropdown} from "semantic-ui-react";

export default class GenreItems extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            "genres":[],
            "selectedGenre":'Categoria'
        };
    }


    loadGameFromServer () {

        fetch("/api/genres/",
            {
                "headers": new Headers({
                    "Accept": "application/json"
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((genres) => {

              this.setState({genres});

          }).
          catch((error) => {

              console.error(error);

          });

    }
    

    componentWillMount () {

        this.loadGameFromServer();

    }

    handleClick(genreName){
        const option = genreName;
        this.setState({ selectedGenre: genreName });
        this.props.callbackParent(option);
    }

    mountGenreItems(){
        if(typeof this.state.genres === "undefined"){
            return false
        }
        const gameGenresItems = this.state.genres.map((genre) =>
                <Dropdown.Item onClick={(e) => this.handleClick(genre.name, e)}>
                    {genre.name}
                </Dropdown.Item>
        );
        return gameGenresItems

    }

    render (){
        return(
            <Dropdown text={this.state.selectedGenre}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.handleClick('Todas as categorias', e)}>
                        Todas as categorias
                    </Dropdown.Item>
                    {this.mountGenreItems()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
