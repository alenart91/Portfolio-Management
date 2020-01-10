import React from 'react';

// export const TokenContext = React.createContext();
// export const TokenProvider = TokenContext.Provider;
// export const TokenConsumer = TokenContext.Consumer;


export const TokenContext = React.createContext();

class TokenContextProvider extends React.Component {

      constructor() {
        super();
        this.state = {
          topTokens: [],
          portfolioTokens: [],
          loading: true
        };
      };


    componentDidMount() {
        const url = '/test';
        const tokens = JSON.parse(localStorage.getItem('token-names'));

        if(tokens) {

          this.setState({topTokens: tokens, loading: false});

        } else {

        fetch(url)
        .then( (res) => {
          if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Server is not responding');
        }
        })
        .then( (data) => {
           if (!data) {
             throw new Error('No data can be found');
           }
          this.setState({topTokens: data.data.data, loading: false}, () => {

            localStorage.setItem('token-names', JSON.stringify(this.state.topTokens));

          });

        })
        .catch( (err) => {
          console.log(err, err.Error, err.message);
          // this.setState({error: true, notificationType: 'error', errorMessage: err.message, loading: false});
        });
       }
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
          <TokenContext.Provider value = {managePortfolio}>
            <button onClick = {this.changeSomething}>context button</button>
            {this.props.children}
          </TokenContext.Provider>
        );
      };
    }

export default TokenContextProvider
