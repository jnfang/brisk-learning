import {GoogleDocComponent} from "./previewComponents.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"

export default function PreviewGmail (props){

    const subject = (str) => {
        const a = str.substring(
            str.indexOf("<s>") + 3, 
            str.lastIndexOf("<b>") - 1
        ).trim();
        return a
    }

    const body = (str) => {
        const a =  str.substring(
            str.lastIndexOf("<b>") + 3, 
            str.length
        ).trim();
        return a
    }

    const getAttachments = (str) => {
        if (str == null) return null;
        if (str.indexOf("<a>") == -1) return null;
        const a = str.substring(
            str.indexOf("<a>") + 3, 
            str.lastIndexOf("<a>") - 1
        ).trim();
        const attachmentStringArray = a.split("%");
        var attachmentDictArray = []
        let tempArray;
        for (let i = 0; i < attachmentStringArray.length; i++){
            tempArray = attachmentStringArray[i].split("|");
            if (tempArray.length != 3) continue;
            attachmentDictArray.push(
                {
                    "type": tempArray[0].trim(),
                    "title": tempArray[1].trim(),
                    "url": tempArray[2].trim()
                }
            )
        }
        return attachmentDictArray
    }

    const [emailDraft , setEmailDraft] = useState(body(props.response || " "));
    const [emailDraftSubject , setEmailDraftSubject] = useState(subject(props.response  || " "));
    const [sentStatus, setSentStatus] = useState(false);
    const [emailAttachments, setEmailAttachments] = useState(null);

    useEffect(() => {
        setEmailDraft(body(props.response || " "));
        setEmailDraftSubject(subject(props.response  || " "));
        setEmailAttachments(getAttachments(props.response));
    }, [props.response])

    const emailForm = (
        <form className="flex flex-col">
            <div className="subject-line-container"> 
                <b>Subject:</b>
                <input className="border-2 border-slate-300	rounded-sm" type="text" defaultValue={emailDraftSubject}></input>
            </div>
            <div className="email-body-content">
                <b>Body:</b>
                <div></div>
                <textarea
                    className="border-2 border-slate-300	rounded-sm"
                    rows="13"
                    defaultValue={emailDraft}
                >
                </textarea>
            </div>
            <div className="flex flex-row flex-wrap">
                <div className="mx-1 px-1 py-1 grow border-2flex flex-row justify-between items-center align-middle">
                    {!!emailAttachments || emailAttachments === []? 
                        <GoogleDocComponent docUrl="https://docs.google.com/document/d/1SyqxM7VHj3sSwfObuQoLaDoCtC9UX6DeLqNpbHf4MCc/edit?usp=sharing" title="The Contrasting Themes of the Romantic Period" />

                        : null
                
                    }
                    <button>
                        <FontAwesomeIcon
                            style={{ color: "#580cfc" }}
                            className="box-border h-5 w-5"
                            icon={faCirclePlus}
                        />
                    </button>
                </div>
                <button
                    onClick={() => setSentStatus(true)}
                    className="start-button float-right rounded-md py-2 px-4 mx-1"
                    type="submit"
                    value="Submit"
                >
                    Send
                </button>
            </div>
        </form>
        );

    if (sentStatus) {
        return (
            <div className="flex flex-col text-sm py-10">
                <FontAwesomeIcon
                    className="box-border h-20"
                    icon={faEnvelopeCircleCheck}
                    style={{ color: "#e5e7eb" }}
                />
                Your email was sent.
            </div>
        )
    } else if (props.response === null) {
        return (            
            <div className="flex loader-container">
                <div className="loader"></div>
            </div>
        );
    } else {
        return (
            <div className="email-container">
                {emailForm}
            </div>
        );
    }
}