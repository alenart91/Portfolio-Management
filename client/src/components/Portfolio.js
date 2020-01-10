import React from 'react';
import TokenBar from './TokenBar.js'
import { AppContext } from '../context/AppContext.js';

class Portfolio extends React.Component {

   constructor() {
     super();
     this.state = {
       portfolioTokens: []
     };
   }

   static contextType = AppContext;

   componentDidMount() {
     this.setState({portfolioTokens: this.context.state.portfolioTokens});
   }


  render() {

    console.log(this.context);

    return (
      <React.Fragment>
       <div className = {this.props.theme}>
       <p>My Portfolio</p>

       <div>
       { this.state.portfolioTokens.map( (coins) => {
         return <TokenBar add = {this.props.add} name = {coins.name} symbol = {coins.symbol} rank = {coins.cmc_rank} price = {coins.price} open = {this.openModal} close = {this.closeModal}/>
       })}
       </div>
       </div>
      </React.Fragment>
    );
  };
}

export default Portfolio
