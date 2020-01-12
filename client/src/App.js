import React from 'react';
import Header from './components/Header.js';
import Layout from './components/Theme.js';
import TopTokens from  './components/TopTokens.js';
import Portfolio from './components/Portfolio.js';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import TokenContextProvider from './context/TokenContext.js';

class App extends React.Component {

constructor() {
  super();
  this.state = {
    theme: 'light'
   };
}

toggleTheme = () => {
  if( this.state.theme === 'light') {
    this.setState({theme: 'dark'});
  }
  else if ( this.state.theme === 'dark') {
    this.setState({theme: 'light'});
  }
}

closeSnackbar = () => {
  this.setState({error: false});
}

openSnackBar = () => {
  this.setState({error: true});
}


render() {

   console.log('main app render');
   return (
       <React.Fragment>
       <TokenContextProvider>

        <Layout theme = {this.state.theme}>
        <Header theme = {this.state.theme} switchTheme = {this.toggleTheme}/>

        <Switch>
          <Route exact path='/'>
              <TopTokens add = {this.addItemToPortfolio} notification = {this.state.notificationType} error = {this.state.error} message = {this.state.message} closeSnackbar = {this.closeSnackbar} openSnackbar = {this.openSnackbar}/>
          </Route>
          <Route exact path='/portfolio'>
              <Portfolio theme = {this.state.theme} />
          </Route>
        </Switch>


        </Layout>
       </TokenContextProvider>
       </React.Fragment>
    );
  }
}

export default App;
