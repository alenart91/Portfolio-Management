import React from 'react';

const SnackBar = (props) => {
   // console.log( message);
  return (
    <React.Fragment>
      <div className = "snackbar">
      <p>{(props.type === 'error') ? 'error message' : 'success message'}</p>
      <p>{props.message}</p>
      <p onClick = {props.close}>close</p>
      </div>
    </React.Fragment>
  );
}

export default SnackBar
