import React, { Component} from 'react';
import FacebookProvider, { Comments } from 'react-facebook';
import { Button } from 'semantic-ui-react';

export default class lomments extends Component {
  render() {
      return (
      <div>
        <FacebookProvider appId={process.env.appId}>
          <Comments href={this.props.url} colorScheme="dark" width={600} />
        </FacebookProvider>
      </div>
      );
    }
}
