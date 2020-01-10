import React from 'react';
import TokenModal from './TokenModal.js';
import { AppContext } from '../context/AppContext.js';
// import { ErrorContext } from '../context/ErrorContext.js';
import '../App.sass';

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
    let token = { name: this.props.name, symbol: this.props.symbol , rank: this.props.rank, price: this.props.price};
    console.log(token);


    let getTokensInLocalStorage = JSON.parse(localStorage.getItem('tokens'));

    if(getTokensInLocalStorage) {
      // filter here
      tokenArray = [...getTokensInLocalStorage];

      let tokenFilter = tokenArray.filter( (coins) => {
        return coins.name === token.name;
      });
      if (tokenFilter.length >= 1 ) {
        return console.log('error duplicate');
      }

      tokenArray.push(token);
      localStorage.setItem('tokens', JSON.stringify(tokenArray));
      getTokensInLocalStorage = JSON.parse(localStorage.getItem('tokens'));

      this.context.updateTokens(getTokensInLocalStorage);
    } else {
      tokenArray.push(token);
      localStorage.setItem('tokens', JSON.stringify(tokenArray));
      getTokensInLocalStorage = JSON.parse(localStorage.getItem('tokens'));
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
   static contextType = AppContext;

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
        </React.Fragment>
      );

   };

}

export default TokenBar
