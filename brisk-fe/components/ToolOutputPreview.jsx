export default function ToolOutputPreview(props) {
    
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
    
    // Here are all the functions for specific tools
    const PreviewGoogleClassroom = (tool, prompt, context) => {
        return <PreviewGeneric toolProp={props.response}></PreviewGeneric>;
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
            {(props.response !== null) ?
                (<form>
                    <div className="subject-line-container"> 
                        <b>Subject:</b>
                        <input className="border-2 border-slate-300	" type="text" defaultValue={subject(props.response)}></input>
                    </div>
                    <div className="email-body-content">
                        <b>Body:</b>
                        <div></div>
                        <textarea
                            className="border-2 border-slate-300	"
                            rows="15"
                            defaultValue={body(props.response)}
                        >
                        </textarea>
                    </div>
                    <button className="start-button float-right rounded-md p-2" type="submit" value="Submit">Send</button>
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
                    <GoogleDocComponent />
                </div>
            )
        }
    }
    
    const PreviewGoogleSlides = (tool, prompt, context) => {
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
    
    const PreviewCanvas = (tool, prompt, context) => {
        return <PreviewGeneric toolProp={props.response}></PreviewGeneric>;
    }
    
    const PreviewRemind = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const PreviewSchoology = (tool, prompt, context) => {
        return <PreviewGeneric toolProp={props.response}></PreviewGeneric>;
    }
    
    const PreviewPowerSchool = (tool, prompt, context) => {
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
                    <img src="https://daext.com/wp-content/uploads/2020/11/vertical-bar-chart-2.png"></img>
                </div>
            )
        }
    }

    const PreviewLexileConverter = (tool, prompt, context) => {
        if (props.response === null) {
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
                        {props.response}
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
        'writing integrity' : PreviewWritingAuth,
        'lesson planner' : PreviewLessonPlanner,
        'monitor': PreviewGeneric,
    }

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
    // but alas, no luck. So we have to do this.
    return (<div>{result}</div>);
}
