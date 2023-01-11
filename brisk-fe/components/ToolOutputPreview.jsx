import React from 'react';
import { GoogleDocComponent, GoogleSlideComponent } from './toolResponsePreviews/previewComponents';
import PreviewGmail from './toolResponsePreviews/PreviewGmail';
import PreviewYoutube from './toolResponsePreviews/PreviewYoutube';
import PreviewGoogleDocs from './toolResponsePreviews/PreviewGoogleDocs';
import PreviewGoogleDrive from './toolResponsePreviews/PreviewGoogleDrive';
import PreviewCurriculum from './toolResponsePreviews/PreviewCurriculum';
import PreviewData from './toolResponsePreviews/PreviewData';

export default function ToolOutputPreview(props) {

    const PreviewGeneric = (toolProp) => {
        if (props.response === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {props.response}
                </div>
            )
        }
    }
    
    const toolPreview = {
        'youtube': <PreviewYoutube response={props.response}/>,
        'gmail': <PreviewGmail response={props.response} />,
        'google docs': <PreviewGoogleDocs response={props.response}/>,
        'google drive': <PreviewGoogleDrive response={props.response}/>,
        'curriculum': <PreviewCurriculum response={props.response}/>,
        'data' : <PreviewData response={props.response}/>,
        'remind' : <PreviewGmail response={props.response}/>,
    }

    const realTool = props.tool;
    const realPrompt = props.prompt;
    const realContext = props.prompt;
    var previewFunction = toolPreview[realTool]
    if (typeof previewFunction === "undefined") {
        console.log("unsupported tool");
        previewFunction = PreviewGeneric;
    }
    if (React.isValidElement(previewFunction)) {
        return previewFunction;
    }
    const result = previewFunction(realTool, realPrompt, realContext)
    // Each integrated app gets its own funciton. Tried to make static methods work
    // but alas, no luck. So we have to do this.
    return (<div>{result}</div>);
}
