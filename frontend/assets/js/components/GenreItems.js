import React from "react";
import {Link} from "react-router-dom";
import {Dropdown} from "semantic-ui-react";

export default class GenreItems extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            "games":[],
            "selectedGenre":'Categoria'
        };
    }


    loadGameFromServer () {

        fetch("/api/list/",
            {
                "headers": new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((games) => {

              this.setState({games});

          }).
          catch((error) => {

              console.error(error);

          });

    }
    

    componentWillMount () {

        this.loadGameFromServer();

    }

    getGenres(){

        const gameGenres = [];
        for(var i = 0;i < this.state.games.length;i++){
            var genresList = this.state.games[i].information.genres
            for(var k = 0;k < genresList.length;k++){
                var genreName = this.state.games[i].information.genres[k].name
                if(this.deleteEqualElements(genreName, gameGenres)){
                    gameGenres.push(genreName)
                }
            }
        }
        return gameGenres

    }

    handleClick(genreName){
        const option = genreName;
        this.setState({ selectedGenre: genreName });
        this.props.callbackParent(option);
    }

    mountGenreItems(){
        if(typeof this.state.games === "undefined"){
            return false
        }
        const genreNames = this.getGenres()
        const gameGenresItems = genreNames.map((name) =>
                <Dropdown.Item onClick={(e) => this.handleClick(name, e)}>
                    {name}
                </Dropdown.Item>
        );
        return gameGenresItems

    }

    deleteEqualElements(element, list){
        var i = 0;
        while(i < list.length){
            if(element === list[i]){
                return false
            }
            i++
        }

        return true

    }

    render (){
        return(
            <Dropdown text={this.state.selectedGenre}>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => this.handleClick('Todas categorias', e)}>
                        Todas categorias
                    </Dropdown.Item>
                    {this.mountGenreItems()}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
