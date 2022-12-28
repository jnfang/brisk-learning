import { useState } from "react";
import ToolOutputPreview from "./ToolOutputPreview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TOOLDICTIONARY = {
  'google classroom': "https://cdn.worldvectorlogo.com/logos/google-classroom.svg",
  'youtube': "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
  'gmail': "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
  'google meet': "https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg",
  'google calendar': "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
  'google docs': "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg",
  'google slides':"https://media.flaticon.com/dist/min/img/landing/gsuite/slides.svg",
  'google sheets': "https://media.flaticon.com/dist/min/img/landing/gsuite/sheets.svg",
  'zoom': "https://www.yourstrategic.com/wp-content/uploads/2021/11/Zoom-Icon.png",
  'clever': "https://images.squarespace-cdn.com/content/v1/59d3e365f43b55815a1bad33/1598978265798-V9XFUYOUCY6YY0XO8XBR/image-asset.png",
  'remind': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRGVCxXrMYevZYjNcNPbK55jhxTk9fBHtm8Q&usqp=CAU",
  'schoology':"https://img.icons8.com/plasticine/400/schoology.png",
  'aries': "https://pbs.twimg.com/profile_images/770375041145987072/Pr4KhDXP_400x400.jpg",
  'canvas': "https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png",
  'powerschool': "https://wellesleyps.org/wms/wp-content/uploads/sites/16/2020/09/powerschool-P-logo.png",
  'google drive': "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png",
  'wikipedia': "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
  'curriculum' : "https://www.citypng.com/public/uploads/preview/hd-purple-round-pencil-icon-png-171630368416vlipzv1qyr.png",
  'data': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfp_Aguqo9ljbIMjZZVlZjnHSgkxWVLLXwg&usqp=CAU"
};

const PROMPTSEPERATOR = "//P//";

export default function CurrentWorkflow({showWorkflow}) {
  if (typeof window === 'undefined') {return (<div></div>)}
  var lastBotMessage = localStorage["lastBotMessage"];
  if (showWorkflow && !!lastBotMessage){
    return (
      <div className='integration-container rounded-sm'>
        <div className="current-integration">
          Workflow
        </div>
        <div>
          {CurrentWorkflow.jsxWorkflowArray(lastBotMessage)}
        </div>
      </div>
    )
  }else{
    return <div></div>
  }
};

CurrentWorkflow.jsxWorkflowArray = (msg) => {
  var workflowVisualizationArray = [];
  const srcArrayHash = CurrentWorkflow.toolOptions(msg);

  // Hit am async function that takes srcArrayHash and makes requests
  for (let i = 0; i < srcArrayHash.length; i++){
    // Toolhash has three keys, "src", "prompt", and "tool" 
    var toolHash = srcArrayHash[i]
    const tool = toolHash["tool"];
    const src = toolHash["src"];
    const prompt = toolHash["prompt"];
    let colonIndex = prompt.indexOf(":");
    if (colonIndex > -1 && colonIndex < prompt.length) {prompt = prompt.substring(colonIndex +1, prompt.length).trim()}

    var workflowElement = (
      <div className="tool-container">
        <div className="flex flex-row">
          <div className="basis-5/8">
            <img className="integration-icon" src={src} />
          </div>
          <div className="basis-3/8 font-bold text-left prompt-container">
            {prompt}
          </div>
          <div className="inline-flex options-container">
            <button class="cancel-button font-bold py-2 px-4 rounded-l">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </button>
            <button class="cancel-button font-bold py-2 px-4 rounded-r">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
              </svg>         
            </button>
          </div>
        </div>
      <ToolOutputPreview tool={tool} prompt={prompt} context={"this is some context"} />
    </div>
    
    )
    workflowVisualizationArray.push(workflowElement);
  }
  return workflowVisualizationArray;
}



// Function returns an array of dictionaries ordered by when they show up in GPT3
// dictionary includes key for each tool in the sentence and the names referenced in
// the dialog statement. If there are more than one tool referenced in a single sentence,
// the students will be added to both entries
// If the most recent referenced tool is the same tool, we don't add it as part of the workflow
CurrentWorkflow.toolOptions = (msg) => {
  // Split the message by sentence so we can get a rough ordering of the tools that are used
  if (msg.indexOf(PROMPTSEPERATOR) === -1) {console.log("no prompts"); return []}
  var finalArrayHash = [];
  var msg_array = msg.split(PROMPTSEPERATOR).splice(1)
  for (let i = 0; i < msg_array.length; i++) {
    // Get an array of hashes of tools : image
    let prompt = msg_array[i];
    let imgHash = CurrentWorkflow.parseSentence(prompt)
    if (imgHash !== null) {
      finalArrayHash.push(imgHash);
    }
  }
  // This should be an ordered array of tool dictionaries that are referenced in the response
  return finalArrayHash;
}

CurrentWorkflow.parseSentence = (prompt) => {
  // All we want is one tool and we know it should be the first part of the prompt
  let indexOfColon = prompt.indexOf(":");
  let toolUsed = prompt.substring(0, indexOfColon).trim().toLowerCase();
  if (toolUsed in TOOLDICTIONARY) {
    let src = TOOLDICTIONARY[toolUsed]
    return {"src": src, "tool": toolUsed, "prompt": prompt};
  } else {
    console.log("The tool " + toolUsed + " was not found in tool dictionary");
    return null; 
  }
}


CurrentWorkflow.toolDictionary = () => {
  return TOOLDICTIONARY;
}

CurrentWorkflow.tools = () => {
  return Object.keys(TOOLDICTIONARY);
}