import React from "react";
import {Container, Segment} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import SegmentTitle from "../layout/SegmentTitle";
import CardsSlide from "../layout/CardsSlide"


export default class IndexPage extends React.Component {

    render () {

        return (
            <div>
                <Segment inverted color='blue'>
                    <Container>
                        <IndexSlide />
                    </Container>
                </Segment>
                <Container>
                    <SegmentTitle title={'Mais curtidos'} />
                    <CardsSlide url="/api/games/" />
                    <SegmentTitle title={'Mais baixados'} />
                    <CardsSlide url="/api/games/?ordering=-downloads_count" />
                    <SegmentTitle title={''} />
                </Container>
            </div>
        );

    }
}