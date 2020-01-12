import React from 'react';
import TokenBar from './TokenBar.js'
import { TokenContext } from '../context/TokenContext.js';

class Portfolio extends React.Component {

   constructor() {
     super();
     this.state = {
       portfolioTokens: []
     };
   }

   static contextType = TokenContext;

   // componentDidMount() {
   //   this.setState({portfolioTokens: this.context.state.portfolioTokens});
   // }


  render() {

    console.log(this.context);

    return (
      <React.Fragment>
       <div className = {this.props.theme}>
       <p>My Portfolio</p>

       <div>
       { this.context.state.portfolioTokens.map( (coins) => {
         return <TokenBar add = {this.props.add} name = {coins.name} symbol = {coins.symbol} rank = {coins.cmc_rank} price = {coins.quote.USD.price} open = {this.openModal} close = {this.closeModal}/>
       })}
       </div>
       </div>
      </React.Fragment>
    );
  };
}

export default Portfolio
