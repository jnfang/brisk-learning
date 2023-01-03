import React, {useState} from 'react';
import Chatbot, { createChatBotMessage } from 'react-chatbot-kit'

import ActionProvider from '../components/ActionProvider';
import MessageParser from '../components/MessageParser';
import CurrentWorkflow from '../components/CurrentWorkflow';
import config from '../components/config';
import { createClientMessage } from 'react-chatbot-kit';
import { invokeChatResponse } from "./utils";

import 'react-chatbot-kit/build/main.css';
import { useEffect } from 'react';

export default function Chat(props) {

  const [showIntegrations, setShowIntegrations] = useState(true);
  const [botMessagesState, setBotMessagesState] = useState([]);
  const [lastBotMessageState, setLastBotMessagesState] = useState(null);
  const [initialMessages, setInitialMessages] = useState([createClientMessage(props.firstInput)]);
  const [madeInitialRequest, setMadeInitialRequest] = useState(false);
  const [workflowAttachments, setWorkflowAttachments] = useState(props.initialAttachments);
  const [allMessagesState, setAllMessagesState] = useState([createClientMessage(props.firstInput)]);
  const [exampleState, setExampleState] = useState(props.exampleState);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    setAllMessagesState(messages);
  };

  const setInitialMessagesCallback = (botResponse) => {
    setInitialMessages([createClientMessage(props.firstInput), createChatBotMessage(botResponse)]);
  };

  const loadMessages = () => {
    // Okay so we're going to have to call the action provider method here to create the chatbot message
    if (!madeInitialRequest) {
      setMadeInitialRequest(true);
      invokeChatResponse(
        props.firstInput,
        "",
        setInitialMessagesCallback,
        workflowAttachments,
        exampleState
      );
    }
  };

  const handleIntegrationClick = () => {
    setShowIntegrations(!showIntegrations);
  }

  useEffect(() => {
    loadMessages();
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
        <h1 className="text-3xl font-bold">Anything your TA can do...</h1>
        <h1 className="text-2xl font-bold">Brisk can do better.</h1>
      </div>
    )
  }

  return (
    <div className="App">
        <div className="flex flex-row extra-top-padding">
          <div className="basis-2/3">
            <ChatHeader></ChatHeader>
            <IntegrationPanel></IntegrationPanel>
            <CurrentWorkflow
              messages={allMessagesState}
              attachments={workflowAttachments}
              exampleFlow={exampleState}
            />
          </div>
          <div className="basis-1/3">
            <Chatbot
              config={config}
              key={initialMessages.length}
              actionProvider={ActionProvider}
              messageParser={MessageParser} 
              messageHistory={initialMessages} 
              saveMessages={saveMessages}
            />
          </div>
        </div>
    </div>
  );
}
