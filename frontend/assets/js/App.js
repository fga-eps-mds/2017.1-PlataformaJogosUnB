import React from 'react';
import ReactDOM from 'react-dom';
import MainRoutes from './routes/MainRoutes';

class App extends React.Component{
    render(){
      return(
      <div>
        <MainRoutes/>
        <h1>OLAR</h1>
      </div>
    );
  }
}

ReactDOM.render(<App url='/api/list/' pollInterval={1000}/>, document.getElementById('container'))
