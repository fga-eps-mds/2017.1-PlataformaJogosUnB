import React from 'react';
import InternalSlide from '../../assets/js/layout/InternalSlide';
import ImageGallery from "react-image-gallery";
import renderer from 'react-test-renderer';

test('Test render InternalSlide', () => {
  const component = renderer.create(
      <ImageGallery
          items= 'image1.jpg'
          slideInterval={2000}
          onImageLoad = {function()}
      />
     );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
