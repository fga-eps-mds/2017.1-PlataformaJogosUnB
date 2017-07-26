import React from "react";
import {Segment, Image} from "semantic-ui-react";
import logo_footer from "../../../public/bundles/images/logo_footer.png"

export default class Footer extends React.Component {

    render () {
        return (
            <Segment inverted size='massive'>
                <Image src={logo_footer} centered size='medium' />
            </Segment>
        );
    }
}
