import React from "react";
import {Container} from "semantic-ui-react";
import IndexSlide from "../../assets/js/layout/IndexSlide";
import SegmentTitle from "../../assets/js/layout/SegmentTitle";
import GenreSlide from "../../assets/js/layout/GenreSlide"
import renderer from 'react-test-renderer';

test('Test render IndexPage', () => {
  const component = renderer.create(
		<div>
            <Container>
                <SegmentTitle title="Mais curtidos" />
                <SegmentTitle title="Mais baixados" />
                <GenreSlide url="/api/games/?ordering=-downloads_count" />
            </Container>
        </div>
	);

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
