import { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

export default function ToolOutputPreview(props) {
    
    const [toolRequestData, setToolRequestData] = useState(null);
    const invokeToolEndpoint = 'http://127.0.0.1:8080/invoke_tool';
    const [maxToolRequests, setMaxToolRequests] = useState(0);
    const [toolState, setToolState] = useState(props.tool);
    const [promptState, setPromptState] = useState(props.prompt);
    const [attachmentState, setAttachmentState] = useState(props.attachments);


    const GoogleDocComponent = (docUrl) => {
        docUrl = "https://docs.google.com/document/d/1SyqxM7VHj3sSwfObuQoLaDoCtC9UX6DeLqNpbHf4MCc/edit?usp=sharing";
        const src = "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg"
        return (
            <div className="google-doc-container rounded flex">
                <div className="bg-slate-200 rounded flex px-1 py-1">
                    <img className="fileShortCutImg" src={src} />
                    <div className="fileShortCutTitle px-2 font-semibold py-1">
                        <a href={docUrl}>Google Doc</a>
                    </div>
                </div>
            </div>
        )
    }

    const GoogleSlideComponent = (docUrl) => {
        docUrl = "https://docs.google.com/presentation/d/1WiitB8CBijz0SaLZRlbaMubJcelM5IgP6H9yZNtLEOc/edit?usp=sharing";
        const src = "https://media.flaticon.com/dist/min/img/landing/gsuite/slides.svg"
        return (
            <div className="google-doc-container rounded flex">
                <div className="bg-slate-200 rounded flex px-1 py-1">
                    <img className="fileShortCutImg" src={src} />
                    <div className="fileShortCutTitle px-2 font-semibold py-1">
                        <a href={docUrl}>Google Slide</a>
                    </div>
                </div>
            </div>
        )
    }

    // For a given string, if it contains "docs.google.com", return JSX with the text,
    // with GoogleDocComponent replacing every word that contains "docs.google.com".
    // Otherwise, return the string.
    const interpolateGoogleDocs = (str) => {
        return str;
    }

    // const copyToClipboard = () => {navigator.clipboard.writeText(newContent)} 


    const PreviewGeneric = (toolProp) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                </div>
            )
        }
    }
    
    async function handleToolRequest(request_tool, request_prompt, attachments) {
        // Do validation on inputs - optional for now
        // We only run this if toolRequestData is null to avoid a race condition, there's
        // probably a better way to address this!
        

        const inactiveTools = ["google drive", "google caledar", "google sheets",
            "google slides", "google docs", "remind", "clever", "zoom", "google meet", "youtube", "data", "curriculum"]
        if (inactiveTools.includes(request_tool)) {
            setToolRequestData("Default output");
            return null;
        }
        if (toolRequestData === null && maxToolRequests < 1) {
            const data = {
                tool: request_tool,
                prompt: request_prompt,
                attachments: attachments
            }
            setMaxToolRequests(maxToolRequests + 1);
            const res = await fetch(invokeToolEndpoint, {
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const result = await res.json();
            setToolRequestData(result.toolResponse);
        }
        return null;
    }

    useEffect(() => {
        handleToolRequest(toolState, promptState, attachmentState);
    }, [attachmentState]);
    

    // Here are all the functions for specific tools
    const PreviewGoogleClassroom = (tool, prompt, context) => {
        return <PreviewGeneric toolProp={toolRequestData}></PreviewGeneric>;
    }

    const PreviewGmail = (tool, prompt, context) => {
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

        return (
        <div className="email-container">
            {(toolRequestData !== null) ?
                (<form>
                    <div className="subject-line-container"> 
                        <b>Subject:</b>
                        <input className="border-2 border-slate-300	" type="text" defaultValue={subject(toolRequestData)}></input>
                    </div>
                    <div className="email-body-content">
                        <b>Body:</b>
                        <div></div>
                        <textarea
                            className="border-2 border-slate-300	"
                            rows="15"
                            defaultValue={body(toolRequestData)}
                        >
                        </textarea>
                    </div>
                    <button className="start-button float-right" type="submit" value="Submit">Send</button>
                </form>)
                : (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>)
            }
        </div>);
    }
    
    const PreviewGoogleCalendar = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }

    const PreviewGoogleDrive = (tool, prompt, context) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                    <div className="flex">
                        <GoogleDocComponent />
                        <div className="px-1"></div>
                        <GoogleSlideComponent />
                    </div>
                </div>
            )
        }
    }
    
    const PreviewGoogleMeet = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const PreviewGoogleDocs = (tool, prompt, context) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                    <GoogleDocComponent />
                </div>
            )
        }
    }
    
    const PreviewGoogleSlides = (tool, prompt, context) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                    <GoogleSlideComponent />
                </div>
            )
        }
    }
    
    const PreviewGoogleSheets = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const PreviewZoom = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const PreviewAries = (tool, prompt, context) => {

        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                </div>
            )
        }
    }
    
    const PreviewCanvas = (tool, prompt, context) => {
        return <PreviewGeneric toolProp={toolRequestData}></PreviewGeneric>;
    }
    
    const PreviewRemind = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const PreviewSchoology = (tool, prompt, context) => {
        return <PreviewGeneric toolProp={toolRequestData}></PreviewGeneric>;
    }
    
    const PreviewPowerSchool = (tool, prompt, context) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                </div>
            )
        }
    }
    
    const PreviewClever = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const PreviewWikipedia = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }

    const PreviewYoutube = (tool, prompt, context) => {
        return (
            <div>
                <iframe width="426" height="240" src="https://www.youtube.com/embed/IElkjzC9YhQ" title="Interpreting the meaning of the derivative in context | AP Calculus AB | Khan Academy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        );
    }

    const PreviewCurriculum = (tool, prompt, context) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                    <div className="flex">
                        <GoogleDocComponent />
                        <div className="px-1"></div>
                        <GoogleSlideComponent />
                    </div>

                </div>
            )
        }
    }

    const PreviewData = (tool, prompt, context) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {toolRequestData}
                    <img src="https://daext.com/wp-content/uploads/2020/11/vertical-bar-chart-2.png"></img>
                </div>
            )
        }
    }

    const PreviewLexileConverter = (tool, prompt, context) => {
        if (toolRequestData === null) {
            return (
                <div className="flex loader-container">
                    <div className="loader"></div>
                </div>
            )
        } else {
            return (
                <div className="email-container">
                    {/* <FontAwesomeIcon
                          className="absolute box-border h-5 w-5 copy-btn"
                          icon={faCopy}
                          onClick={copyToClipboard}
                    /> */}
                    <div>
                        {toolRequestData}
                    </div>

                </div>
            )
        }
    }

    const PreviewWritingAuth = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }

    const PreviewLessonPlanner = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }

    // For a gmail or remind action
    const toolPreview = {
        'google classroom': PreviewGoogleClassroom,
        'youtube': PreviewYoutube,
        'gmail': PreviewGmail,
        'google meet': PreviewGoogleMeet,
        'google calendar': PreviewGoogleCalendar,
        'google docs': PreviewGoogleDocs,
        'google slides': PreviewGoogleSlides,
        'google sheets': PreviewGoogleSheets,
        'zoom': PreviewZoom,
        'clever': PreviewClever,
        'remind': PreviewRemind,
        'schoology': PreviewSchoology,
        'aries': PreviewAries,
        'canvas': PreviewCanvas,
        'powerschool': PreviewPowerSchool,
        'google drive': PreviewGoogleDrive,
        'wikipedia': PreviewWikipedia,
        'curriculum': PreviewCurriculum,
        'data' : PreviewData,
        'lexile converter' : PreviewLexileConverter,
        'writing authentication' : PreviewWritingAuth,
        'lesson planner' : PreviewLessonPlanner,
    }
    // For a google doc action, generate a downloadable icon
    // For a google calendar action, do what
    // For a google slides action, generate a downloadable icon
    // For a google sheets action, generate a downloadable icon
    // For youtube action, show excerpt and link to full page
    // For an SIS action, just show names. If the prompt would output names,
    // we show one or more names
    // For Google Classroom, Schoology or Canvas, I'm not sure what to do
    // For curriculum action, generate / create / write -- OpenAI
    // For curriculum translate or convert, open a textbox called input -- OpenAI
    // 

    const realTool = props.tool;
    const realPrompt = props.prompt;
    const realContext = props.prompt;
    var previewFunction = toolPreview[realTool]
    if (typeof previewFunction === "undefined") {
        console.log("unsupported tool");
        previewFunction = PreviewGeneric;
    }

    const result = previewFunction(realTool, realPrompt, realContext)
    // Each integrated app gets its own funciton. Tried to make static methods work
    // but alas


    return (<div>{result}</div>);
}
