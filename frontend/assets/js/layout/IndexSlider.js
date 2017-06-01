import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';

require('style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss');

var Carousel = require('nuka-carousel');

export default class IndexSlider extends React.Component{

    constructor(props){
      super(props);
      this.state = { games: [] };
    }

    loadGameFromServer(){
          fetch("/api/list/",
                {
                  headers: new Headers({ "Content-Type": "application/json", "Accept": "application/json"}),
                  method: "GET",
              })
          .then((response) => {
               return response.json();
              })
          .then(((games) => {
              this.setState({ games: games });
          }).bind(this))
          .catch((error) => {
              console.error(error);
          });
    }

    componentDidMount() {
          this.loadGameFromServer();
      }
    handleImageLoad(event) {
      console.log('Image loaded ', event.target)
    }

    render(){
       var temp = [];
       var temps;
       var imgs = [];
       var gameCards = gameCards=this.state.games.map((game)=>{
         for(var i = 0;i < game.media_image.length;i++){
             if (game.media_image[i].role === "slider"){
                 {temp.push(game.media_image[i].image)}

             }

         }


         });

        temps = temp.map((image)=>{
          return (
            imgs.push(<img src={image} height="250" width="250" />
          ))
        });
        {console.log (temp[0])}
        return (
          <Carousel>
          {imgs}
          </Carousel>
        )
    }

}
