import React, {useContext} from 'react';
import Alert from 'react-bootstrap/Alert'
import appContext from '../context/AppContext';

const ErrorMessage = () => {
    const {error} = useContext(appContext);

    return (
      error && 
      (
        <Alert variant="danger" style={{marginTop:'50px'}}>
          {error}
        </Alert>
      )
      // (
      //   <div className={`alert alert-danger`}>
      //     <i className="fas fa-info-cicle"></i> {error}
      //   </div>
      // )
    );
}

export default ErrorMessage;
