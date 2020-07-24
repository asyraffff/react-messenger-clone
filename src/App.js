import React, { useState, useEffect } from 'react';
import { IconButton, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import './App.css';

function App() {
  // state (short term memory) => no refresh
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [logged, setLogged] = useState(false);
  // const [messages, setMessages] = useState([]);
  // input = varialble name (the picece of memory in a state)

  // console.log(input);
  // console.log(messages);
  // console.log(username);

  // useState => variable in REACT
  // useEffect => block of code that will excecuted based on condition

  useEffect(() => {
    // onSnapshot => when there are new document in database, onSnapshot will snap(camera) that new doucement
    // real time capture the database
    // listener
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() })));
      });
  }, []);

  const login = () => {
    setLogged(true);
  }

  // useEffect(() => {
  //   // run code here...
  //   // if [], this code runs ONCE when the app component load => load when page refresh

  //   // const username = prompt('Please enter your name');
  //   // setUsername(username);
  //   setUsername(prompt('Please enter your name')); // the name will stored in username

  // }, []); // condition (dependecies)

  const sendMessage = (event) => {
    event.preventDefault(); // prevent the refresh stuff !!
    // all the logic to send a message goes
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // we want to push what inside the input to the list
    //setMessages([...messages, { username: username, text: input }]); // get all the messages and append new message after old messages
    setInput(''); // clear the input value
  };

  return (
    <div className="app">
      <img
        className="app__logo"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100%h=100"
        alt="logo"
      />
      <h1>React Messenger App 🚀</h1>
      {!logged &&
        <div class="app__loginPage">
          <h2 className="app__textLogin">Login</h2>
          <div class="app__loginInput">
            <Input className="app__userInput" type="text" placeholder="Your name..." onChange={event => setUsername(event.target.value)} />
            <button onClick={login}>Confirm</button>
          </div>
        </div>
      }
      {logged &&
        <h2 className="app__welcome">Welcome <span class="app__username">{username}</span> ❗❗</h2>
      }

      {logged &&
        // {/* form give the Enter Button active */}
        // {/* form refresh on submit => event.preventDefault() */}
        <div class="app__formContainer">
          <form className="app__form">
            <FormControl className="app__formControl">
              <Input className="app__input" placeholder="Enter a message..." type="text" value={input} onChange={event => setInput(event.target.value)} />
              <IconButton
                className="app__iconButton"
                disabled={!input}
                variant="contained"
                color="primary"
                type="submit"
                onClick={sendMessage}
              >
                <SendIcon />
              </IconButton>
            </FormControl>

            {/* input field */}
            {/* // <input type="text" value={input} onChange={event => setInput(event.target.value)} /> */}

            {/* Button */}
            {/* <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>Send message</Button> */}
          </form>
        </div>

      }
      {/* to kick out the empty input => diable !input */}

      {/* message themeselves */}

      {logged &&
        <FlipMove style={{ 'z-index': '-1' }}>
          {
            messages.map(({ id, message }) => (
              <Message key={id} username={username} message={message} />
              // <p>{message}</p>
            ))
          }

        </FlipMove>

      }
    </div>
  );
}

export default App;
