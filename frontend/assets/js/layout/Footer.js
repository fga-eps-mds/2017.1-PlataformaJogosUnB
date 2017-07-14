import React from "react";
import {Segment, Image} from "semantic-ui-react";
import logo from "../../../public/bundles/images/logo_unb.png"

export default class Footer extends React.Component {

    render () {
        return (
            <Segment inverted size='massive' textAlign='center'>
                <Image src={logo} centered size='medium' />
            </Segment>
        );
    }
}
