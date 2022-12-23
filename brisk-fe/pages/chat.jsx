import React, {useState} from 'react';
import Chatbot from 'react-chatbot-kit'
import Link from 'next/link';

import ActionProvider from '../components/ActionProvider';
import MessageParser from '../components/MessageParser';
import config from '../components/config';

import 'react-chatbot-kit/build/main.css';

export default function Chat() {

  const [showIntegrations, setShowIntegrations] = useState(true);

  const NavBar = () => {
    return(
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/">Homepage</Link>
              </li>
              <li>
                <Link href="/chat">Chat</Link>
              </li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">Brisk</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    )
  }

  const handleIntegrationClick = () => {
    setShowIntegrations(!showIntegrations);
    console.log("hello my friend");
    console.log(showIntegrations);
  }

  const IntegrationIcons = () => {
    return (
      <div className="grid grid-cols-9 current-integration-icons">
        <img className="integration-icon" alt="hell" src="https://cdn.worldvectorlogo.com/logos/google-classroom.svg" />
        <img className="integration-icon" src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" />
        <img className="integration-icon" src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"/>
        <img className="integration-icon" src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg"/>
        <img className="integration-icon" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" />
        <img className="integration-icon" src="https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg" />
        <img className="integration-icon" src="https://media.flaticon.com/dist/min/img/landing/gsuite/slides.svg" />
        <img className="integration-icon" src="https://media.flaticon.com/dist/min/img/landing/gsuite/sheets.svg" />
        <img className="integration-icon" src="https://www.yourstrategic.com/wp-content/uploads/2021/11/Zoom-Icon.png" />
        <img className="integration-icon" src="https://images.squarespace-cdn.com/content/v1/59d3e365f43b55815a1bad33/1598978265798-V9XFUYOUCY6YY0XO8XBR/image-asset.png" />
        <img className="integration-icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRGVCxXrMYevZYjNcNPbK55jhxTk9fBHtm8Q&usqp=CAU" />
        <img className="integration-icon" src="https://play-lh.googleusercontent.com/H5eXed9UvaW7Jn6SCAm-_d4T0hExQ3xFoh1ml1mAgMWqw1CG0C8ltBBS7Cq99iSg4XAJ" />
        <img className="integration-icon" src="https://pbs.twimg.com/profile_images/770375041145987072/Pr4KhDXP_400x400.jpg" />
        <img className="integration-icon" src="https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png" />
      </div>
    )
  }

  const OutputContainer = () => {
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
        <h1 className="text-3xl font-bold">Your personal TA </h1>
        <h1 className="text-2xl font-bold">Stop Clicking Around.</h1>
      </div>
    )
  }
  return (
    <div className="App">
        <NavBar></NavBar>
        <div className="flex flex-row extra-top-padding">
          <div className="basis-1/2">
            <ChatHeader></ChatHeader>
            <OutputContainer></OutputContainer>
          </div>
            <div className="basis-1/2">
              <div></div>
              <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
           </div>
        </div>
    </div>
  );
}
