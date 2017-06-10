import React, { Component} from 'react';
import FacebookProvider, { Comments } from 'react-facebook';

export default class lomments extends Component {
  render() {
      return (
      <div>
        <FacebookProvider appId={process.env.appId}>
          <Comments href={this.props.url} colorScheme={'dark'} width='100%' />
        </FacebookProvider>
      </div>
      );
    }
}
