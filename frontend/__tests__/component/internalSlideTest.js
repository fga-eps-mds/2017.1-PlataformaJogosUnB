import React from 'react';
import InternalSlide from '../../assets/js/layout/InternalSlide';
import ImageGallery from "react-image-gallery";
import imageUnavailable from '../../public/bundles/images/imgIndisponivel.png';
import renderer from 'react-test-renderer';

test('Test render InternalSlide', () => {
  const component = renderer.create(
      <ImageGallery
          items= 'image1.jpg'
          slideInterval={2000}
          onImageLoad = {{}, false}
          slideOnThumbnailHover
          autoplay
          showPlayButton={false}
      />
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
