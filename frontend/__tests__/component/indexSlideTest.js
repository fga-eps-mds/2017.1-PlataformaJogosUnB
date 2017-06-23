import React from 'react';
import IndexSlide from '../../assets/js/layout/IndexSlide';
import Slider from 'react-slick';
import renderer from 'react-test-renderer';

test('Test render IndexSlide', () => {
  const component = renderer.create(
      <div style={carouselImageStyle}>
          <Slider {...settings}>['image1.jpg', 'image2.jpg', 'image3.jpg']
          </Slider></div>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
