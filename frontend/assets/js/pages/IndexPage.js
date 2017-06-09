import React from "react";
import ReactDOM from "react-dom";
import {Card, Container, Segment} from "semantic-ui-react";
import IndexSlide from "../layout/IndexSlide";
import GameCard from "../components/cards/GameCard";
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
