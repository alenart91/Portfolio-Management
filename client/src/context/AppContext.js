import React from 'react';

export const AppContext = React.createContext();

class AppContextProvider extends React.Component {

      constructor() {
        super();
        this.state = {
          portfolioTokens: 'first test',
          loading: true
        };
      }


    componentDidMount() {
        // let freshPortfolio = JSON.parse(localStorage.getItem('tokens'));
        console.log('componentDidMount');

        this.setState({portfolioTokens: 'second test', loading: false});
      }

      updateTokens = (tokens) => {
         console.log('update tokens', tokens);
         this.setState({portfolioTokens: tokens});
      }

      changeSomething = () => {
        console.log('change something');
        this.setState({portfolioTokens: 'button update'});

      }


      render() {
        console.log('mounts', this.state);
        const managePortfolio = { state: {...this.state}, updateTokens: this.updateTokens};

        return (
          <AppContext.Provider value = {managePortfolio}>
            <button onClick = {this.changeSomething}>context button</button>
            {this.props.children}
          </AppContext.Provider>
        );
      };
    }

export default AppContextProvider
