import React from "react";
import {Link} from "react-router-dom";
import {Dropdown} from "semantic-ui-react";
import {gameListApi} from "../resource/GameApi";

export default class Genres extends React.Component{

    constructor (props) {
        super(props);
        this.state = {"games":[]};
    }

    componentWillMount () {

      gameListApi((games) => { this.setState({games}) });

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

    mountGenreItems(){
        if(typeof this.state.games === "undefined"){
            return false
        }
        const genreNames = this.getGenres()
        const gameGenresItems = [];
        for(var i = 0;i < genreNames.length;i++){
            const genreComponent = <Dropdown.Item text={genreNames[i]} as={Link} to={`/filter/${genreNames[i]}`} params={{"genre":genreNames[i]}}/>
            gameGenresItems.push(genreComponent)
        }
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
            <Dropdown text= 'Categorias'>
                        <Dropdown.Menu>
                            {this.mountGenreItems()}
                        </Dropdown.Menu>
            </Dropdown>
        );
    }

}
