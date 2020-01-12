import React from 'react';
import TokenBar from './TokenBar.js';
import SnackBar from './SnackBar.js';
// import { TokenContext, TokenConsumer } from '../context/TokenContext.js';
import {TokenContext} from '../context/TokenContext.js';

class TopTokens extends React.Component {
  static contextType = TokenContext;

   constructor(props, context) {
     super(props, context);
     this.state = {
       topTokens: [],
       loading: true,
       tokenModalOpen: false
     };
     console.log(this.context);
   }


  closeSnackbar = () => {
    this.setState({error: false});
  }

  openSnackbar = () => {
    this.setState({error: true});
  }


  render() {
    // console.log(this.context);
    // console.log(this.state.topTokens);
    // console.log(this.state);

    // do we need a seperate tokenBar component?

    // const tokenContextObject = {...this.context};
    return (
      <React.Fragment>
      {this.context.state.loading ? <p>Loading...</p> :
      <div> { this.context.state.topTokens.map( (coins) => {
        return <TokenBar key = {coins.name} add = {this.props.add} name = {coins.name} symbol = {coins.symbol} rank = {coins.cmc_rank} price = {coins.quote.USD.price} open = {this.openModal} close = {this.closeModal}/>
      })} </div> }
      { this.state.error ? <SnackBar close = {this.closeSnackbar} type = {this.state.notificationType} message = {this.state.message}  /> : null }
      </React.Fragment>
    );
  };
}

export default TopTokens
