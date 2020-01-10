import React from 'react';

export const ErrorContext = React.createContext();

class ErrorContextProvider extends React.Component {

      constructor() {
        super();
        this.state = {
          notificationType: '',
          message: '',
          isOpen: false
        };
      }


      render() {
        console.log( 'error context file', ErrorContext);

        return (
          <ErrorContext.Provider value = {{...this.state}}>
            {this.props.children}
          </ErrorContext.Provider>
        );
      };
    }

export default ErrorContextProvider
