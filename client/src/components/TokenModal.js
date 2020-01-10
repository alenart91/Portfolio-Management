import React from 'react';



class TokenModal extends React.Component  {

componentDidMount() {
  // retrieve extra data here from api using the name to input on the fetch call
}


 render() {

   const modalClassName = this.props.show ? "modal show" : "modal hide";

  return (
    <div className={modalClassName}>
      <section className="modal-main">
           <p>{this.props.name}</p>
        <button onClick = {this.props.close}>close</button>
      </section>
    </div>
  );
 }
}

export default TokenModal
