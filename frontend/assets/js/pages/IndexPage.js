import React from "react";
import {Container, Segment} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import GameList from "../components/GameList";
import SegmentTitle from "../layout/SegmentTitle";

export default class IndexPage extends React.Component {

    render () {

        return (
            <div>
                <Container>
                    <IndexSlide />
                    <SegmentTitle title={'Mais curtidos'} />
                    <GameList />
                </Container>
            </div>
        );

    }
}
