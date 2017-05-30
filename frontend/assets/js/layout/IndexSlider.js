import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';
require('style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss');
// https://github.com/xiaolin/react-image-gallery


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
   
           { console.log(temp);} 

            var a = []
            for(var i = 0;i < temp.length;i++){
                a.push({
                    original :  temp[i],
                    srcset : "large.jpg 1400w, medium.jpg 700w, small.jpg 400w",
                    sizes :"(min-width: 700px) 700px, 100vw" 
                })
            }

      return(
        <ImageGallery
          items={a}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          slideOnThumbnailHover={true}
          autoplay={true}
          showPlayButton={false}/>
      );
    }

}



