import React, {useState, useContext, useEffect} from 'react'; 
import Button from 'react-bootstrap/Button'
import Message from './Message';

import appContext from '../context/AppContext';

const ListMessages = () => {
    const [aa, setAA] = useState('');
    const {messages, getMessages, clearMessages, loading} = useContext(appContext);

    useEffect(
      () => getMessages(),
      // eslint-disable-next-line
      []
    );

    console.log('Messages are: ', messages);

    // if ( loading || ! Array.isArray(messages) ) {
    if ( loading ) {
      return (
        <div style={{marginTop:'50px'}}>
          Loading messages...
        </div>
      )
    }

    return (
        
        <div style={{marginTop:'50px'}}>
            {/* <button onClick={( e => getMessages())}>Refresh</button>
            <button onClick={ e => clearMessages()}>Clear</button> */}
            <Button variant="primary" onClick={( e => getMessages())}>Refresh</Button>{' '}
            <Button variant="secondary" onClick={( e => clearMessages())}>Clear</Button>{' '}
            <div style={{marginTop:'30px'}}>
            { messages && messages.length ? 
                ( 
                    messages.map( msg => ( <Message key={msg.position} info={msg} /> ) )
                  )
                :
              'No messages.'
            }
            </div>
        </div>
    )
}

export default ListMessages;