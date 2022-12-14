import React, {useState} from 'react';

import Chat from '../components/Chat';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import TextAttachmentBox from '../components/TextAttachmentBox';
import LinkAttachmentBox from '../components/LinkAttachmentBox';
import ExampleContainer from '../components/ExampleContainer';
import { useEffect } from 'react';
import { exampleToolData } from "../components/utils";



export default function Demo() {
  const [firstInput, setFirstInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [attachments, setAttachments] = useState({});
  const [showAttachmentDropdown, setShowAttachmentDropdown] = useState(false);
  const [showTextAttachmentBox, setShowTextAttachmentBox] = useState(false);
  const [showLinkAttachmentBox, setShowLinkAttachmentBox] = useState(false);
  const [exampleFlow, setExampleFlow] = useState(null);
  const [defaultTab, setDefaultTab] = useState("Current Workflow");
  const [lastBotMessage, setLastBotMessage] = useState(null);

  const handleGoSubmit = (e) =>  {
    e.preventDefault();
    setSubmitted(true);
  }

  const onAttachIconClick = (e) => {
    setShowAttachmentDropdown(!showAttachmentDropdown);
  }

  const onClickText = (e) => {
    setShowAttachmentDropdown(false);
    setShowTextAttachmentBox(true);
    setShowLinkAttachmentBox(false);
  }

  const onClickLink = (e) => {
    setShowAttachmentDropdown(false);
    setShowLinkAttachmentBox(true);
    setShowTextAttachmentBox(false);
  }

  const handleTextAttachmentClick = (text) => {
    if (!!text){
      const textAttachmentDict = {"text": text};
      setAttachments(attachments => ({...attachments, ...textAttachmentDict}));
    }
    setShowTextAttachmentBox(false);
    setShowLinkAttachmentBox(false);
  }

  const handleLinkAttachmentClick = (link) => {
    if (!!link){
      const linkAttachmentDict = {"link": link};
      setAttachments(attachments => ({...attachments, ...linkAttachmentDict}));
    }
    setShowTextAttachmentBox(false);
    setShowLinkAttachmentBox(false);
  }

  const handleCancelClick = (e) => {
    setShowTextAttachmentBox(false);
    setShowLinkAttachmentBox(false);
  }

  const handleResetClick = () => {
    setFirstInput(null);
    setSubmitted(false);
  }


  useEffect(() => {
    if (localStorage["lastBotMessage"] != lastBotMessage){
      setLastBotMessage(localStorage["lastBotMessage"]);
      setExampleFlow(null);
    }
    });

  const handleExampleClick = (exampleDict) => {
    const individualExampleHash = exampleToolData[exampleDict.exampleTitle];

    // We want to set the localStorage to simulate the chat -> workflow flow
    if (!individualExampleHash){
      return null;
    }
    localStorage.setItem("lastBotMessage", individualExampleHash["chat response"]);
    setLastBotMessage(individualExampleHash["chat response"]);


    setFirstInput(exampleDict.exampleMessage);
    var attachments = {};

    // We need to set the current default tab to "Current Workflow" because in workflow example flow
    // We want to switch back to the workflow tab
    setDefaultTab("Current Workflow");

    // This is just validation, we should be in the example flow if we are here
    const inExampleFlow = exampleDict["exampleTitle"] && exampleDict["exampleTitle"].length > 0 &&
      exampleDict["tools"] && exampleDict["tools"].length > 0;
    
    if (inExampleFlow) {
      setExampleFlow(exampleDict.exampleTitle);
    }
    // Setting text and link attachments is optional
    if (exampleDict["text"]){
      attachments["text"] = exampleDict["text"];
    }
    if (exampleDict["link"]){
      attachments["link"] = exampleDict["link"];
    }
    setAttachments(attachments);
    setSubmitted(true);
  }

  // Use Hook to make

  const Dropdown = () => {
    if (showAttachmentDropdown){
      return (
        <div className=''>
          <ul className='dropdown-attach border-2 rounded-lg'>
              <li className='menu-item'>
                <button className='dropdown-button px-4' onClick={onClickText}>Text</button>
              </li>
              <li className='menu-item'>
                <button className='dropdown-button px-4' onClick={onClickLink}>Link</button>
              </li>
            </ul>
        </div>
      )
    } else {
      return null;
    }
  }

  const DottedRectangle = () => {
    return (
      <svg
        viewBox="0 0 52 24"
        fill="currentColor"
        className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
      >
      <defs>
        <pattern
          id="b039bae0-fdd5-4311-b198-8557b064fce0"
          x="0"
          y="0"
          width=".135"
          height=".30"
        >
        <circle cx="1" cy="1" r=".7" />
        </pattern>
      </defs>
      <rect
        fill="url(#b039bae0-fdd5-4311-b198-8557b064fce0)"
        width="52"
        height="24"
      />
    </svg>

    );
  }

  return (
    <div>
      <Navbar />
      {(submitted) ?
        <Chat 
          key={exampleFlow} 
          firstInput={firstInput}
          initialAttachments={attachments}
          exampleState={exampleFlow}
          onExampleClick={handleExampleClick}
          openTab={defaultTab}
          setDefaultTab={setDefaultTab}
          onResetClick={handleResetClick}
        ></Chat>
        :
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 ">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Demo
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
                  <DottedRectangle/>
                  <span className="relative">The</span>
                </span>{' '}
                Teacher Super App
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                The first app designed for you.
              </p>
            </div>
            <form onSubmit={handleGoSubmit} className="main-form flex flex-col items-center w-full mb-4 md:flex-row">
              <input
                placeholder="What do you need to do?"
                required=""
                onChange={(e) => {setFirstInput(e.target.value)}}
                type="text"
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-600 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                className="attach-button h-12 px-4 tracking-wide transition duration-200 rounded shadow-md md:w-auto focus:outline-none"
                onClick={onAttachIconClick}>
                <FontAwesomeIcon
                  className="box-border h-5 w-5"
                  icon={faPaperclip}
                />
                <Dropdown className="dropdown-attach"></Dropdown>

              </button>

              <button
                type="submit"
                className="start-button h-12 px-4 tracking-wide transition duration-200 rounded shadow-md md:w-auto focus:outline-none"
              >
                Go
              </button>
            </form>
            {(showTextAttachmentBox) ? 
              <TextAttachmentBox onSubmit={handleTextAttachmentClick} onCancel={handleCancelClick}/> :
              null
            }
            {(showLinkAttachmentBox) ?
              <LinkAttachmentBox onSubmit={handleLinkAttachmentClick} onCancel={handleCancelClick}/> :
              null 
            }
            <div>
              <h1 className="font-sans text-2xl font-bold text-left px-5 py-5">Need some inspiration?</h1>
            </div>

            <ExampleContainer handleExampleClick={handleExampleClick}></ExampleContainer>
          
          </div>
        </div>
      </div>
      } 
    </div>
  )
}
