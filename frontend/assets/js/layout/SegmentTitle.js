import React, { Component} from 'react';
import { Segment } from 'semantic-ui-react';

export default class SegmentTitle extends Component {
  render() {
      return (
      	<Segment padded inverted color="grey">
                <h1>{this.props.title}</h1>
        </Segment>    
      );
    }
}
