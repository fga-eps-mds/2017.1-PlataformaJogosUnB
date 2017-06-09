import React, { Component} from 'react';
import FacebookProvider, { Comments } from 'react-facebook';

export default class Comment extends Component {
  render() {
      return (
      <div>
        <FacebookProvider appId={process.env.appId}>
          <Comments href={this.props.url} colorscheme='dark' width='100%' />
        </FacebookProvider>
      </div>
      );
    }
}
