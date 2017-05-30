import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';

require('style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss');
// https://github.com/xiaolin/react-image-gallery

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
        
        var a=[];
       var gameCards = gameCards=this.state.games.map((game)=>{
         for(var i = 0;i < game.media_image.length;i++){
             {console.log(game.media_image[i].role)}
             {console.log(i)}
             {console.log(game.media_image.length)}
             if (game.media_image[i].role === "slider"){
                 {temp.push(game.media_image[i].image)}

             }

         }


         });

        temps = temp.map((image)=>{
            {a.push(<img src={image} height="400" width="400"/>)}
        });
        {console.log (temp[0])}
        return (
          <div style={{width:'100%', margin:'auto'}}>
          <Carousel>
          {a} 
          </Carousel>
          </div>
        )
    }

}
