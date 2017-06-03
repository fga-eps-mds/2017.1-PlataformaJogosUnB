
import React from 'react';
import ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';
require('style-loader!css-loader!sass-loader!react-image-gallery/styles/scss/image-gallery.scss');
// https://github.com/xiaolin/react-image-gallery

export default class InternalSlider extends React.Component{

    handleImageLoad(event) {
      console.log('Image loaded ', event.target)
    }
    render(){
        var imagesTeste = this.props.data.media_image.map((testando) => {
            return {original: testando.image, thumbnail: testando.image }
    });

      return(
        <ImageGallery
          items={imagesTeste}
          slideInterval={2000}
          onImageLoad={this.handleImageLoad}
          slideOnThumbnailHover={true}
          autoplay={true}
          showPlayButton={false}/>
      );
    }
}