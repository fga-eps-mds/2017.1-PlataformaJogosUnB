import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


  ReactDOM.render(<App url='/api/list/' pollInterval={1000} />, document.getElementById('container'))
 
