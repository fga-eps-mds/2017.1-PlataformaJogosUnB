import React from "react";
import PropTypes from "prop-types";
import { Dimmer, Loader } from 'semantic-ui-react';

export default class LoadingAnimation extends React.Component {
	render() {
		return (
			<Dimmer active={this.props.hasLoading}>
				<Loader size='massive'>Carregando...</Loader>
			</Dimmer>
		);
	}
}

LoadingAnimation.propTypes = {
    hasLoading: PropTypes.bool.isRequired,
}
