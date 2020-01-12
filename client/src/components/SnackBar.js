import React , {useContext} from 'react';
import { TokenContext } from '../context/TokenContext.js';

const SnackBar = (props) => {

  const tokenContext = useContext(TokenContext);

  return (
    <React.Fragment>
      <div className = "snackbar">
        <p>{(tokenContext.state.notificationType === 'error') ? 'error message' : 'success message'}</p>
        <p>{tokenContext.state.message}</p>
        <p onClick = {tokenContext.closeMessage}>close</p>
      </div>
    </React.Fragment>
  );
}

export default SnackBar
