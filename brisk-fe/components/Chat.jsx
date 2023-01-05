import React, {useState} from 'react';
import Chatbot, { createChatBotMessage } from 'react-chatbot-kit'

import ActionProvider from '../components/ActionProvider';
import MessageParser from '../components/MessageParser';
import CurrentWorkflow from '../components/CurrentWorkflow';
import config from '../components/config';
import { createClientMessage } from 'react-chatbot-kit';
import { invokeChatResponse, TOOLDESCRIPTIONS } from "./utils";
import Tabs from './Tabs';
import 'react-chatbot-kit/build/main.css';
import { useEffect } from 'react';
import ExampleContainer from './ExampleContainer';

export default function Chat(props) {

  const [botMessagesState, setBotMessagesState] = useState([]);
  const [lastBotMessageState, setLastBotMessagesState] = useState(null);
  const [initialMessages, setInitialMessages] = useState([createClientMessage(props.firstInput)]);
  const [madeInitialRequest, setMadeInitialRequest] = useState(false);
  const [workflowAttachments, setWorkflowAttachments] = useState(props.initialAttachments);
  const [allMessagesState, setAllMessagesState] = useState([createClientMessage(props.firstInput)]);
  const [exampleState, setExampleState] = useState(props.exampleState);
  const [tabs, setTabs] = useState(["Current Workflow", "Integrations", "Examples"]);

  const handleTabClick = (tab) => {
    props.setDefaultTab(tab);
  }

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
            setLastBotMessagesState(lastMessage);
            props.setDefaultTab("Current Workflow");
          }
        })
      }
    } catch(err) {
      console.log("server side rendering threw this error " + err)
    }
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
  const IntegrationPanel = () => {
    return (
      <div className="flex flex-row flex-wrap items-stretch current-integration-icons">
        {shuffleArray(CurrentWorkflow.tools().map(createIconImage))}
      </div>
    )
  }

  const createIconImage = (tool) => {
    return (
      <div className='basis-1/3' >
        <div className='flex m-3 grow flex-col bg-white border border-gray-300 rounded shadow-lg appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline'>
          <img 
            className="p-10 h-26"
            key={tool}
            alt={tool}
            title={tool}
            src={CurrentWorkflow.toolDictionary()[tool]}
          />
            <b>{TOOLDESCRIPTIONS[tool]['name']}</b>
            <div className='text-left p-2 text-sm text-gray-600'>
              {TOOLDESCRIPTIONS[tool]['description']}
            </div>
        </div>
      </div>
    )
  }


  const ChatHeader = () => {
    return (
      <div>
        <h1 className="text-3xl font-bold">Anything your TA can do...</h1>
        <h1 className="text-2xl font-bold">Brisk can do better.</h1>
      </div>
    )
  }

  const tabPanel = () => {
    switch(props.openTab){
      case "Integrations":
        return <IntegrationPanel/>
      case "Current Workflow":
        return <CurrentWorkflow
          messages={allMessagesState}
          attachments={workflowAttachments}
          exampleFlow={exampleState}
        />
      default:
        return <ExampleContainer handleExampleClick={props.onExampleClick}/>
    }
  }

  return (
    <div className="App">
        <div className="flex flex-row extra-top-padding">
          <div className="basis-2/3">
            <ChatHeader></ChatHeader>
            <Tabs tabs={tabs} openTab={props.openTab} onTabClick={handleTabClick}></Tabs>
            {tabPanel()}
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
