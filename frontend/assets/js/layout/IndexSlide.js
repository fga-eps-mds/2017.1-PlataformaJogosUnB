import "style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss";

import React from "react";
import InfiniteCarousel from "react-leaf-carousel";

const imageStyle = {
    "bottom": 0,
    "height": "100%",
    "left": 0,
    "margin": "auto",
    "position": "absolute",
    "right": 0,
    "top": 0,
}, carouselImageStyle = {
    "background": "#000000",
    "minHeight": "400px",
    "position": "relative",
};

export default class IndexSlider extends React.Component {

    constructor (props) {

        super(props);
        this.state = {"games": []};

    }

    componentWillMount () {

        this.loadGameFromServer();

    }

    loadGameFromServer () {

        fetch("/api/list/",
            {
                "headers": new Headers({
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }),
                "method": "GET"
            }).
          then((response) => response.json()).
          then((games) => {

              this.setState({games});

          });

    }

    

    render () {
		const images = this.mountImages();

        if(images.length){
        return (

                <InfiniteCarousel
  
                    autoCycle={true}
                    cycleInterval={4200}
                    showSides={false}
                    slidesToScroll={1}
                    slidesToShow={1}
                    scrollOnDevice={true}

    
                >	{images}
                </InfiniteCarousel>
            );
        }else{
            return <img/>
        }
    }
    

    mountImages(){
       const images = [], imagesSlide = 4;

        for(var idx=0; idx < imagesSlide && idx < this.state.games.length; idx+=1){
            const image =
                   (<div style={carouselImageStyle}>
                            <img 
                               src={this.state.games[idx].slide_image} 
                               style={imageStyle} />
                        </div>)
           images.push(image);
        
        }
        return images;
    }

}
