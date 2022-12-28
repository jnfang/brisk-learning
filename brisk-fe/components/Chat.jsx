import React, {useState} from 'react';
import Chatbot from 'react-chatbot-kit'

import ActionProvider from '../components/ActionProvider';
import MessageParser from '../components/MessageParser';
import CurrentWorkflow from '../components/CurrentWorkflow';
import config from '../components/config';

import 'react-chatbot-kit/build/main.css';
import { useEffect } from 'react';

export default function Chat() {

  const [showIntegrations, setShowIntegrations] = useState(true);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [botMessagesState, setBotMessagesState] = useState([]);
  const [lastBotMessageState, setLastBotMessagesState] = useState(null);

  const handleIntegrationClick = () => {
    setShowIntegrations(!showIntegrations);
  }

  useEffect(() => {
    try{
      if (typeof document !== "undefined") {
        var containers = document.getElementsByClassName("react-chatbot-kit-chat-inner-container")
        if (containers.length != 1){return null;}
        containers[0].addEventListener('DOMNodeInserted', (event) => {
          var updatedBotMessages = document.getElementsByClassName("react-chatbot-kit-chat-bot-message");
          if (updatedBotMessages.length > 1){
            var messageArray = [];
            var lastMessage = null;
            for (let i = 0; i < updatedBotMessages.length; i++) {
              lastMessage = updatedBotMessages[i].textContent;
              messageArray.push(lastMessage);
            }
            setShowWorkflow(true);
            setBotMessagesState(messageArray);
            setShowIntegrations(false);
            setLastBotMessagesState(lastMessage);
          }
        })
      }
    } catch(err) {
      console.log("server side rendering threw this error " + err)
    }
  });

  const IntegrationIcons = () => {
    return (
      <div className="grid grid-cols-9 current-integration-icons">
        {CurrentWorkflow.tools().map(createIconImage)}
      </div>
    )
  }

  const createIconImage = (tool) => {
    return (
      <img 
        className="integration-icon"
        key={tool}
        alt={tool}
        title={tool}
        src={CurrentWorkflow.toolDictionary()[tool]}
      />
    )
  }

  const IntegrationPanel = () => {
    // Default Content
    const defaultContent = (
      <div className="integration-container rounded-sm">
        <div className="current-integration" onClick={() => handleIntegrationClick()}>
          Current Integrations
        </div>
        {showIntegrations ?
            <IntegrationIcons /> : null
        }
      </div>
    )
    return defaultContent;
  }

  const ChatHeader = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold">Your virtual assistant</h1>
        <h1 className="text-2xl font-bold">Stop Clicking Around.</h1>
      </div>
    )
  }

  return (
    <div className="App">
        <div className="flex flex-row extra-top-padding">
            <div className="basis-1/2">
                <ChatHeader></ChatHeader>
                <IntegrationPanel></IntegrationPanel>
                <CurrentWorkflow showWorkflow={showWorkflow}></CurrentWorkflow>
            </div>
            <div className="basis-1/2">
                <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/>
            </div>
        </div>
    </div>
  );
}
