import React, { Component} from 'react';
import FacebookProvider, { ShareButton } from 'react-facebook';

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="1850394608544081">
        <ShareButton href="unbgames.lappis.rocks" />
      </FacebookProvider>
    );
  }
}
