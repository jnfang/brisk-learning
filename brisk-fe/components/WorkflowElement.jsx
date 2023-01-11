import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import ToolOutputPreview from './ToolOutputPreview';

export default function WorkflowElement (props) {

    const [showStatus, setShowStatus] = useState(true);
    const [toolResponse, setToolResponse] = useState(null);
    const [minimized, setMinimized] = useState(false);

    const handleCancel = () => {
        setShowStatus(false);
    }

    const handleMinimize = () => {
        setMinimized(true);

    }

    const handleExpand = () => {
        setMinimized(false);
    }


    const parseCurrentWorkflowResponseData = () => {
        // props.currentWorkflowResponseData is an array of dictionaries. Each dictionary will have a "tool" key, "prompt" key, "attachments" key,
        // and "toolResponse". We will check if there is a dictionary with matching tool and prompt, if so, we will return the toolResponse.
        // If not, we will return null.
        // Check if props.tool, props.prompt, and props.currentWorkflowResponseData are truthy
        if (!props.tool || !props.prompt || !props.currentWorkflowResponseData) {
            return null;
        }
        let toolishResponse;
        // Check if there is a dictionary in props.currentWorkflowResponseData with matching tool and prompt
        for (let i = 0; i < props.currentWorkflowResponseData.length; i++) {
            if (props.currentWorkflowResponseData[i].tool === props.tool && props.currentWorkflowResponseData[i].prompt === props.prompt) {
                toolishResponse = props.currentWorkflowResponseData[i].toolResponse;
                return toolishResponse.constructor === Object ? toolishResponse["toolResponse"] : toolishResponse;
            }
        }
        return null;
    }

    useEffect(() => {
        setToolResponse(parseCurrentWorkflowResponseData());
    }, [props.currentWorkflowResponseData]);

    if (showStatus) {
        return (
            <div key={props.tool} className="tool-container  bg-white border border-gray-300 rounded shadow-lg appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline">
                <div className="flex flex-row ">
                    <div className="basis-5/8">
                        <img className="integration-icon" src={props.src} />
                    </div>
                    <div className="basis-3/8 font-bold text-left prompt-container">
                        {props.prompt}
                    </div>
                    <div className="inline-flex options-container">
                        {minimized ? 
                            <button onClick={handleExpand}>
                                <FontAwesomeIcon
                                    className="box-border h-4 w-4 cancel-button"
                                    icon={faPlus}
                                />
                            </button>
                            :
                            <button onClick={handleMinimize}>
                                <FontAwesomeIcon
                                    className="box-border h-4 w-4 cancel-button"
                                    icon={faMinus}
                                />
                            </button>
                        }
                        <button onClick={handleCancel}>
                            <FontAwesomeIcon
                                className="box-border h-3 w-3 cancel-button"
                                icon={faXmark}
                            />
                        </button>
                    </div>
                </div>
                {minimized ? null :
                    <ToolOutputPreview
                        tool={props.tool}
                        prompt={props.prompt}
                        attachments={props.attachments}
                        exampleFlow={props.exampleFlow}
                        response={toolResponse}
                    />
                }
            </div>
        )
    } else {
        return null;
    }




}