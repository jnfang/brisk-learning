import React, {useState} from 'react';

import Chat from '../components/Chat';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';


export default function Demo() {
  const [firstInput, setFirstInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [attachments, setAttachments] = useState({});
  const [showAttachmentDropdown, setShowAttachmentDropdown] = useState(false);
  const [showTextAttachmentBox, setShowTextAttachmentBox] = useState(false);
  const [showLinkAttachmentBox, setShowLinkAttachmentBox] = useState(false);
  const [tempTextAttachment, setTempTextAttachment] = useState(null);
  const [tempLinkAttachment, setTempLinkAttachment] = useState(null);


  const handleGoSubmit = (e) =>  {
    e.preventDefault();
    // console.log("hello");
    // setFirstInput(currentInput);
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

  const handleAttachmentClick = (e) => {
    console.log("clicked text attachment")
    e.preventDefault();
    if (tempTextAttachment){
      const textAttachmentDict = {"text": tempTextAttachment};
      setAttachments(attachments => ({...attachments, ...textAttachmentDict}));
    }
    if (tempLinkAttachment){
      const linkAttachmentDict = {"link": tempLinkAttachment};
      setAttachments(attachments => ({...attachments, ...linkAttachmentDict}));
    }
    console.log(attachments);
  }

  const handleCancelClick = (e) => {
    setShowTextAttachmentBox(false);
    setShowLinkAttachmentBox(false);
    setTempLinkAttachment(null);
    setTempTextAttachment(null);
  }

  const Dropdown = () => {
    if (showAttachmentDropdown){
      return (
        <div className=''>
          <ul className='dropdown-attach border-2'>
              <li className='menu-item'>
                <Button className='dropdown-button' onClick={onClickText}>Text</Button>
              </li>
              <li className='menu-item'>
                <Button className='dropdown-button' onClick={onClickLink}>Link</Button>
              </li>
            </ul>
        </div>
      )
    } else {
      return null;
    }
  }


  const handleTextChange = e => {
    e.persist();
    setTempTextAttachment(e.target.value);
  };
  
  const handleUrlChange = e => {
    e.persist();
    setTempLinkAttachment(e.target.value);
  };

  const CancelAttach = () => {
    return (
      <div>
        <button
          type="submit"
          className="start-button float-right h-12 px-4 tracking-wide transition duration-200 rounded shadow-md md:w-auto focus:outline-none"
        >
          Attach
        </button>
        <button
          type="button"
          onClick={handleCancelClick}
          className="attach-button float-right h-12 px-4 tracking-wide transition duration-200 rounded shadow-md md:w-auto focus:outline-none"
        >
          Cancel
        </button>
      </div>
    )
  }

  const TextAttachmentBox = () => {
    if (showTextAttachmentBox){
      return (
        <div  className="text-left w-full mb-4 ">
          <div>
          <p className="text-base text-gray-700 md:text-lg">
            Attach text or data to this task.
          </p>
          </div>
          <form onSubmit={handleAttachmentClick} className="main-form w-full mb-4 md:flex-row">
            <textarea
              placeholder="Type here..."
              required=""
              rows="8"
              type="text"
              name='text'
              onChange={(e) => {e.persist(); handleTextChange(e.target.value)}}
              className="flex-grow w-full h-40  mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            />
            <CancelAttach></CancelAttach>
          </form>
        </div>
      )
    } else {
      return null;
    }
  }

  const LinkAttachmentBox = () => {
    if (showLinkAttachmentBox){
      return (
        <div  className="text-left w-full mb-4 ">
          <div>
          <p className="text-base text-gray-700 md:text-lg">
            Attach a link to this task.
          </p>
          </div>
          <form onSubmit={handleAttachmentClick} className="main-form w-full mb-4 md:flex-row">
            <input
              placeholder="Paste link here..."
              required=""
              name="link"
              type="url"
              onChange={(e) => {handleUrlChange(e)}}
              className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            />
            <CancelAttach></CancelAttach>
          </form>
        </div>
      )
    } else {
      return null;
    }
  }


  return (
    <div>
      <NavBar></NavBar>
      {(submitted) ?
        <Chat firstInput={firstInput}></Chat>
        :
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl">
          <div className="text-center">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  Brand new
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                <span className="relative inline-block">
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
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
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
              <TextAttachmentBox /> :
              null
            }
            {(showLinkAttachmentBox) ?
              <LinkAttachmentBox /> :
              null 
            }
          
          </div>
        </div>
      </div>
      } 
    </div>
  )
}
