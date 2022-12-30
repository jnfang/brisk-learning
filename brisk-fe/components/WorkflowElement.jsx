import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import ToolOutputPreview from './ToolOutputPreview';

export default function WorkflowElement (props) {

    const [showStatus, setShowStatus] = useState(true);

    const handleCancel = () => {
        setShowStatus(false);
    }
    if (showStatus) {
        return (
            <div key={props.tool} className="tool-container">
                <div className="flex flex-row">
                    <div className="basis-5/8">
                    <img className="integration-icon" src={props.src} />
                    </div>
                    <div className="basis-3/8 font-bold text-left prompt-container">
                    {props.prompt}
                    </div>
                    <div className="inline-flex options-container">
                    <button onClick={handleCancel}>
                    <FontAwesomeIcon
                        className="box-border h-5 w-5 cancel-button"
                        icon={faXmark}
                    />
                    </button>
                    </div>
                </div>
                <ToolOutputPreview tool={props.tool} prompt={props.prompt} attachments={props.attachments} />
            </div>
        )
    } else {
        return null;
    }




}