import { useEffect } from "react";
import { useState } from "react";
import WorkflowElement from "./WorkflowElement";
import { invokeTool } from "./utils";

export const TOOLDICTIONARY = {
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
  'data': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfp_Aguqo9ljbIMjZZVlZjnHSgkxWVLLXwg&usqp=CAU",
  'lexile converter': "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Eo_circle_purple_arrow-up-down.svg/2048px-Eo_circle_purple_arrow-up-down.svg.png",
  'writing integrity': "https://w7.pngwing.com/pngs/54/921/png-transparent-computer-icons-robot-internet-bot-google-docs-robots-purple-electronics-violet.png",
  'lesson planner': "https://static.vecteezy.com/system/resources/previews/012/319/315/original/clipboard-multicolor-circle-line-inverted-icon-vector.jpg",
  'feedback': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlM19sO3G9DCLc0-BaRMW7VzfsLxXQq_DGWIM6tSq2mZSj9Nab_K4BfAsxg197S6Lji3o&usqp=CAU",
  'monitor': "https://cdn2.iconfinder.com/data/icons/advertising-agency-wildberry-vol-1/256/Frequency-512.png",
};

const PROMPTSEPERATOR = "//P//";

export default function CurrentWorkflow(props) {

  const [lastBotMessageState, setLastBotMessageState] = useState(localStorage["lastBotMessage"]);
  const [currentWorkflowRequestData, setCurrentWorkflowRequestData] = useState(CurrentWorkflow.generateRequestData(lastBotMessageState, props.attachments));
  const [currentWorkflowResponseData, setCurrentWorkflowResponseData] = useState([]);
  const [currentWorkflowComponents, setCurrentWorkflowComponents] = useState(CurrentWorkflow.jsxWorkflowArray(currentWorkflowRequestData, currentWorkflowResponseData));
  const [mostRecentRequest, setMostRecentRequest] = useState(null);

  useEffect(() => {
    if (lastBotMessageState !== localStorage["lastBotMessage"]) {
      setLastBotMessageState(localStorage["lastBotMessage"]);
    }
  }, [localStorage["lastBotMessage"]]);

  useEffect(() => {
    if (localStorage["lastBotMessage"] !== localStorage["prevLastBotMessage"]){
      localStorage["prevLastBotMessage"] = localStorage["lastBotMessage"];
      setCurrentWorkflowRequestData(CurrentWorkflow.generateRequestData(localStorage["lastBotMessage"], props.attachments));
    }
  }, []);

  // This is the callback function that is passed to invokeTool
  const workflowResponseCallback = (response) => {
    setCurrentWorkflowResponseData([...currentWorkflowResponseData, response]);
  };

  useEffect(() => {
    setCurrentWorkflowComponents(CurrentWorkflow.jsxWorkflowArray(currentWorkflowRequestData, currentWorkflowResponseData));
  }, [currentWorkflowResponseData]);

  // This looks at currentWorkflowRequestData and currentWorkflowResponseData to see if we need to make a request
  // If currentWorkflowResponseData is not the same size, we know that it needs to make a request at the index of its size
  useEffect(() => {
    // Iterate through currentWorkflowReqestData and see which request we are at

    // If currentWorflowRequestData is the same length as currentWorkflowResponseData, then we are done
    if (currentWorkflowRequestData.length === currentWorkflowResponseData.length) {
      return;
    }
    const requestHash = currentWorkflowRequestData[currentWorkflowResponseData.length];
    if (requestHash === undefined || requestHash["prompt"] === mostRecentRequest) {
      return;
    }

    // If we are not done, then we need to make a request
    invokeTool(requestHash, workflowResponseCallback);

    setMostRecentRequest(requestHash["prompt"])
  }, [currentWorkflowRequestData, currentWorkflowResponseData]);

  const rtnComponent = () => {
    if (typeof window === 'undefined') {return (<div></div>)}
    if (currentWorkflowComponents.every(e => e === null)) {return (<div></div>)}
    if (lastBotMessageState.includes(PROMPTSEPERATOR)){
      return (
        <div>
          {currentWorkflowComponents}
        </div>
      )
    }else{
      return <div></div>
    }
  }

  return rtnComponent();
};

// ExampleFlow is null when you are not in the example flow, otherwise it is the title of the example flow
CurrentWorkflow.jsxWorkflowArray = (currentWorkflowRequestData, currentWorkflowResponseData) => {
  var workflowVisualizationArray = [];
  let workflowHash;
  // Hit am async function that takes srcArrayHash and makes requests
  for (let i = 0; i < currentWorkflowRequestData.length; i++){
    workflowHash = currentWorkflowRequestData[i];
    const workflowElement =
      <WorkflowElement
        src={workflowHash.src}
        tool={workflowHash.tool}
        prompt={workflowHash.prompt}
        attachments={workflowHash.attachments}
        currentWorkflowResponseData={currentWorkflowResponseData}
      />;
    workflowVisualizationArray.push(workflowElement);
  }
  return workflowVisualizationArray;
}

// This will generate the data that is used to initialize currentWorkflowRequestData and will be 
// used to simplify the jsxWorkflowArray function
CurrentWorkflow.generateRequestData = (msg, attachments) => {
  const srcArrayHash = CurrentWorkflow.toolOptions(msg);
  var tempRequestData = [];
  for (let i = 0; i < srcArrayHash.length; i++){
    // Toolhash has three keys, "src", "prompt", and "tool" 
    var toolHash = srcArrayHash[i]
    const prompt = toolHash["prompt"];
    let colonIndex = prompt.indexOf(":");
    if (colonIndex > -1 && colonIndex < prompt.length) {prompt = prompt.substring(colonIndex +1, prompt.length).trim()}
    tempRequestData.push({tool: toolHash["tool"], prompt: prompt, attachments: attachments, src: toolHash["src"]})
  }
  return tempRequestData;
}

// Function returns an array of dictionaries ordered by when they show up in GPT3
// dictionary includes key for each tool in the sentence and the names referenced in
// the dialog statement. If there are more than one tool referenced in a single sentence,
// the students will be added to both entries
// If the most recent referenced tool is the same tool, we don't add it as part of the workflow
CurrentWorkflow.toolOptions = (msg) => {
  // Split the message by sentence so we can get a rough ordering of the tools that are used
  if (msg.indexOf(PROMPTSEPERATOR) === -1) {console.log("NO PROMPTS: " + msg); return []}
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