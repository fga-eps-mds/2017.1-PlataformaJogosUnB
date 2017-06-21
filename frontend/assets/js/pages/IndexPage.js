import React from "react";
import {Container} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import SegmentTitle from "../layout/SegmentTitle";
import GenreSlide from "../layout/GenreSlide"


export default class IndexPage extends React.Component {

    render () {

        return (
            <div>
                <Container>
                    <IndexSlide />
                    <SegmentTitle title={'Mais curtidos'} />
                    <GenreSlide />
                </Container>
            </div>
        );

    }
}
