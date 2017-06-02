import React, { Component} from 'react';
import FacebookProvider, { Like } from 'react-facebook';

export default class GameRating extends Component {
  render() {
    return (
      <FacebookProvider appId="1850394608544081">
        <Like href="http://www.facebook.com" colorScheme="dark" showFaces share />
      </FacebookProvider>
    );
  }
}
