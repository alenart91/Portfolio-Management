import React from 'react';
import TokenModal from './TokenModal.js';
import { TokenContext } from '../context/TokenContext.js';
import '../App.sass';
import SnackBar from './SnackBar.js';

class TokenBar extends React.Component {

  constructor() {
    super();
    this.state = {
      tokenModalOpen: false
    };

  }

  addToken = (e) => {
    e.stopPropagation();

    let tokenArray = [];
    // let token = { name: this.props.name, symbol: this.props.symbol , rank: this.props.rank, price: this.props.price};
    // console.log(token);

    let topTokensCopy = this.context.state.topTokens;
    //console.log(topTokensCopy);


    // get live in sync data from item in topTokens tokenArray
    // filter out the correct token
    // eventually fresh data becomes old
    // because of this we have to push all new data in from toptokens every time

    // get current token
    // if there's current tokens add those names to array
    //

    let token = this.props.name;

    // let newToken = topTokensCopy.filter( item => {
    //   return item.name === this.props.name;
    // });
    //
    // console.log(newToken);
    //
    //
    // let newPortfolioArray = topTokensCopy.filter( item => {
    //   console.log(newToken.includes(item));
    //    return newToken.includes(item);
    //  });
    //
    //
    //  console.log(newPortfolioArray[0]);
    // have to get topTokens array and portfolioTokens array and filter out the ones that are in portfolioTokens tokenArray
    // need the original data and not static



    let getTokensInLocalStorage = JSON.parse(localStorage.getItem('tokens'));

    if(getTokensInLocalStorage) {
      // filter here
      tokenArray = [...getTokensInLocalStorage];

      let tokenFilter = tokenArray.filter( (coins) => {
        return coins === token;
      });
      if (tokenFilter.length >= 1 ) {
        return this.context.displayMessage('error', `${token} is already in your portfolio`);
      }

      tokenArray.push(token);
      localStorage.setItem('tokens', JSON.stringify(tokenArray));
      getTokensInLocalStorage = JSON.parse(localStorage.getItem('tokens'));

      this.context.updateTokens(getTokensInLocalStorage, token);
    } else {
      tokenArray.push(token);
      localStorage.setItem('tokens', JSON.stringify(tokenArray));
      getTokensInLocalStorage = JSON.parse(localStorage.getItem('tokens'));
      this.context.updateTokens(getTokensInLocalStorage, token);
    }

    console.log(getTokensInLocalStorage);

  }


   openModal = (e) => {
     console.log(e);
     console.log('im open', this.props.name);
     this.setState({ tokenModalOpen: true });
   }

   closeModal = () => {
     this.setState({ tokenModalOpen: false });
   }


   // can only use one contexType and it has to be the exact variable name
   // static contextType = ThemeContext;
   static contextType = TokenContext;

   render() {
     const divStyle = {
        width: '500px',
        background: '#F8F8F8'
        };

      console.log('token bar render');


      return (
        <React.Fragment>
          <div onClick = {this.openModal} style = {divStyle}>
            <p>{this.props.name}</p>
            <p>{this.props.symbol}</p>
            <p>{this.props.rank}</p>
            <p>{this.props.price}</p>
            <button onClick={this.addToken}>Add to portfolio</button>
          </div>
          {this.state.tokenModalOpen ? <TokenModal name = {this.props.name} show = {this.state.tokenModalOpen} close = {this.closeModal} /> : null}
          {this.context.state.snackBar ? <SnackBar close = {this.closeSnackbar} type = {this.context.state.notificationType} message = {this.context.state.message}  /> : null}
        </React.Fragment>
      );

   };

}

export default TokenBar
