import { useEffect } from "react";
import { useState } from "react";
import WorkflowElement from "./WorkflowElement";

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
  const [currentWorkflowComponents, setCurrentWorkflowComponents] = useState([]);

  useEffect(() => {
    setCurrentWorkflowComponents(
      CurrentWorkflow.jsxWorkflowArray(
        lastBotMessageState,
        props.attachments,
        props.exampleFlow
      )
    );
  }, [localStorage["lastBotMessage"], props.attachments]);
  if (lastBotMessageState !== localStorage["lastBotMessage"]) {
    setLastBotMessageState(localStorage["lastBotMessage"]);
  }
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
};

// ExampleFlow is null when you are not in the example flow, otherwise it is the title of the example flow
CurrentWorkflow.jsxWorkflowArray = (msg, attachments, exampleFlow) => {
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
    const workflowElement = <WorkflowElement
      src={src}
      tool={tool}
      prompt={prompt}
      attachments={attachments}
      exampleFlow={exampleFlow}
    />;
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