import React from 'react';

export const ThemeContext = React.createContext();

class ThemeContextProvider extends React.Component {

      constructor() {
        super();
        this.state = {
          isLightTheme: true,
          name: 'alex'
        };
      }


      render() {
        console.log( 'context file', ThemeContext);

        return (
          <ThemeContext.Provider value = {{...this.state}}>
            {this.props.children}
          </ThemeContext.Provider>
        );
      };
    }

export default ThemeContextProvider
