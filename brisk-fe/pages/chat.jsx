import React from 'react';
import Chatbot from 'react-chatbot-kit'

import ActionProvider from '../components/ActionProvider';
import MessageParser from '../components/MessageParser';
import config from '../components/config';

import 'react-chatbot-kit/build/main.css';

function Chat() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
      </header>
    </div>
  );
}

export default Chat;