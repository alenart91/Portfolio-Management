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
          initialLoad: 20,
          loading: true,
          snackBar: false,
          message: '',
          notificationType: null
        };
      };


    componentDidMount() {

        let loadPortfolioTokens = JSON.parse(localStorage.getItem('tokens'));
        console.log(loadPortfolioTokens);
        // this.setState({portfolioTokens: loadPortfolioTokens});

        const url = '/test';
        const tokens = JSON.parse(localStorage.getItem('token-name'));

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


          // load fresh data into portfoliotokens array every app reload
          // use util function (same as in update tokens method?)


          // let comparePortfolioTokens = data.data.data.filter( item => {
          //   console.log(loadPortfolioTokens.includes(item.name), item.name);
          //    return loadPortfolioTokens.includes(item);
          //  });
          //
          //
          //  console.log(comparePortfolioTokens);

          // let freshData = this.filterData(loadPortfolioTokens);
          // console.log('fresh', freshData);
          let slicedData = data.data.data.slice(0, this.state.initialLoad);

          this.setState({topTokens: slicedData, fullData: data.data.data, loading: false}, () => {

            // get added portfolio items here and filter theme
            // this will return fresh data on every reload and keep portfolio and toptokens data in sync
            let freshData;
            loadPortfolioTokens ? freshData = this.filterData(loadPortfolioTokens) : freshData = [];
            this.setState({portfolioTokens: freshData});
            localStorage.setItem('token-names', JSON.stringify(this.state.topTokens));

          });

        })
        .catch( (err) => {
          console.log(err, err.Error, err.message);
          // this.setState({error: true, notificationType: 'error', errorMessage: err.message, loading: false});
        });
       }


       window.addEventListener('scroll' , () => {

       if ( window.visualViewport.height + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
        console.log('scroll baby!');
        console.log(this.state.topTokens.slice(0, 20));
        // could just make other api call with specific limits
        let updatedLoadNumber = this.state.initialLoad + 20;
        let updatedTokens = this.state.fullData.slice(0, updatedLoadNumber);
        this.setState({topTokens: updatedTokens, initialLoad: updatedLoadNumber});
      }
    });

      }

      filterData = (tokens) => {
        let sameData = this.state.topTokens.filter(o => tokens.find(tokens => o.name === tokens));
        return sameData;
      }

      updateTokens = (tokens, currentToken) => {
         console.log('update tokens', tokens);
         // compare items in name array to toptokens tokenArray
         // return an array with items that match with data from toptokens

         let noob = this.filterData(tokens);
        console.log('noob', noob);
         // let freshData = this.state.topTokens.filter( (item) => {
         //   console.log(item);
         //   return item.name === tokens;
         // });

         // console.log(sameData);
         // use callback function to set message
         this.setState({portfolioTokens: noob}, () => {

           this.displayMessage('success', `you've added ${currentToken} to your portfolio`);
         });
      };

       displayMessage = (type, message) => {
         this.setState({snackBar: true, notificationType: type, message: message});
       };

       closeMessage = () => {
         console.log('close snackbar');
         this.setState({snackBar: false});
       };




      render() {
        console.log('render', this.state);
        const managePortfolio = { state: {...this.state}, updateTokens: this.updateTokens, displayMessage: this.displayMessage, closeMessage: this.closeMessage};

        return (
          <TokenContext.Provider value = {managePortfolio}>
            {this.props.children}
          </TokenContext.Provider>
        );
      };
    }

export default TokenContextProvider
