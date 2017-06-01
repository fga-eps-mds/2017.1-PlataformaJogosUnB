import React from 'react';
import ReactDOM from 'react-dom';
import MainRoutes from './routes/MainRoutes';
import Menu from './layout/Menu';
import { BrowserRouter } from 'react-router-dom';
import { Grid, Container } from 'semantic-ui-react'
import '../../public/semantic/semantic';
import '../../public/semantic/semantic.less';


class App extends React.Component{
    render(){
      return(
        <BrowserRouter>
          <div>
            <Menu/>
            <Container>
              <MainRoutes/>
            </Container>
          </div>
        </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('container'))
