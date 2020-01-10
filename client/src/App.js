import React from 'react';
import Header from './components/Header.js';
import Layout from './components/Theme.js';
import TopTokens from  './components/TopTokens.js';
import Portfolio from './components/Portfolio.js';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
// import AppContextProvider from './context/AppContext.js';
import TokenContextProvider from './context/TokenContext.js';

class App extends React.Component {

constructor() {
  super();
  this.state = {
    topTokens: [],
    notificationType: null,
    error: false,
    loading: true,
    message: '',
    theme: 'light',
    portfolioItems: []
   };
}

// componentDidMount() {
//   const url = '/test';
//   const tokens = JSON.parse(localStorage.getItem('token-names'));
//
//   if(tokens) {
//
//     this.setState({topTokens: tokens, loading: false});
//
//   } else {
//
//   fetch(url)
//   .then( (res) => {
//     if (res.status === 200) {
//     return res.json();
//   } else {
//     throw new Error('Server is not responding');
//   }
//   })
//   .then( (data) => {
//      if (!data) {
//        throw new Error('No data can be found');
//      }
//     this.setState({topTokens: data.data.data, loading: false}, () => {
//
//       localStorage.setItem('token-names', JSON.stringify(this.state.topTokens));
//
//     });
//
//   })
//   .catch( (err) => {
//     console.log(err, err.Error, err.message);
//     // this.setState({error: true, notificationType: 'error', errorMessage: err.message, loading: false});
//   });
//  }


//}

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

// getPortfolioItems = () => {
//   if( localStorage.getItem('portfolio') ) {
//     const portfolioTokens = JSON.parse(localStorage.getItem('portfolio'));
//     this.setState({portfolioItems: portfolioTokens});
//
//   } else {
//     console.log('no portfolio tokens');
//   }
// }
//
// addItemToPortfolio = (e) => {
//   console.log(e);
//   console.log(e.target.value);
//   e.stopPropagation();
//
//   localStorage.setItem('portfolio', JSON.stringify(this.state.topTokens));
// }

render() {

   console.log('main app rerender');
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
