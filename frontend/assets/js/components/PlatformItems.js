import React from "react";
import {Dropdown} from "semantic-ui-react";

export default class PlatformItems extends React.Component{

    constructor (props) {
        super(props);
        this.state = {
            "games":[],
            "selectedPlatform":'Plataforma'
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

    getPlatforms(){

        const gamePlatforms = [];
        for(var i = 0;i < this.state.games.length;i++){
            for(var j=0 ; j< this.state.games[i].packages.length; j++){
                var platformsList = this.state.games[i].packages[j].platforms;
                for(var k = 0;k < platformsList.length;k++){
                    var platformName = this.state.games[i].packages[j].platforms[k].name
                    if(this.deleteEqualElements(platformName, gamePlatforms)){
                        gamePlatforms.push(platformName);
                    }
                }
            }
        }
        return gamePlatforms;

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
        const platformNames = this.getPlatforms()
        const gamePlatformsItems = platformNames.map((name) =>
                <Dropdown.Item onClick={(e) => this.handleClick(name, e)}>
                    {name}
                </Dropdown.Item>
        );
        return gamePlatformsItems;

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
