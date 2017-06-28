import React from "react";
import { Segment } from 'semantic-ui-react';

export default class SegmentTitle extends React.Component {
	render() {
		return (
			<Segment padded inverted color="grey">
				<h1>{this.props.title}</h1>
			</Segment>
		);
	}
}

