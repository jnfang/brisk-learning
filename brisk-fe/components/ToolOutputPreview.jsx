
export default function ToolOutputPreview(tool, prompt, context) {
    
    
    // Here are all the functions for specific tools
    const previewGoogleClassroom = (tool, prompt, context) => {
        return (<div></div>);
    }

    const previewGmail = (tool, prompt, context) => {
        return (
        <div>
            <img src="https://i.ibb.co/LPcKLwN/Screen-Shot-2022-12-25-at-7-55-08-PM.png"></img>
        </div>);
    }
    
    const previewGoogleCalendar = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }

    const previewGoogleDrive = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewGoogleMeet = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewGoogleDocs = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewGoogleSlides = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewGoogleSheets = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewZoom = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewAries = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewCanvas = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewRemind = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewSchoology = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewPowerSchool = (tool, prompt, context) => {
        console.log("in preview of powerschool");
        return (<div>{tool}</div>);
    }
    
    const previewClever = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    
    const previewWikipedia = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }

    const previewYoutube = (tool, prompt, context) => {
        return (
            <div>
                <iframe width="426" height="240" src="https://www.youtube.com/embed/IElkjzC9YhQ" title="Interpreting the meaning of the derivative in context | AP Calculus AB | Khan Academy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        );
    }

    const previewGeneric = (tool, prompt, context) => {
        return (<div>{tool}</div>);
    }
    // For a gmail or remind action
    const toolPreview = {
        'google classroom': previewGoogleClassroom,
        'youtube': previewYoutube,
        'gmail': previewGmail,
        'google meet': previewGoogleMeet,
        'google calendar': previewGoogleCalendar,
        'google docs': previewGoogleDocs,
        'google slides': previewGoogleSlides,
        'google sheets': previewGoogleSheets,
        'zoom': previewZoom,
        'clever': previewClever,
        'remind': previewRemind,
        'schoology': previewSchoology,
        'aries': previewAries,
        'canvas': previewCanvas,
        'powerschool': previewPowerSchool,
        'google drive': previewGoogleDrive,
        'wikipedia': previewWikipedia,
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

    const realTool = tool.tool;
    var previewFunction = toolPreview[realTool]
    console.log(realTool);
    console.log(previewFunction);
    if (typeof previewFunction === "undefined") {
        console.log("unsupported tool");
        previewFunction = previewGeneric;
    }
    const result = previewFunction(realTool, prompt, context)
    // Each integrated app gets its own funciton. Tried to make static methods work
    // but alas


    return (<div>{result}</div>);
}
