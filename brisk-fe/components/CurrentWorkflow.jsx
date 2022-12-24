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
  'schoology':"https://play-lh.googleusercontent.com/H5eXed9UvaW7Jn6SCAm-_d4T0hExQ3xFoh1ml1mAgMWqw1CG0C8ltBBS7Cq99iSg4XAJ",
  'aries': "https://pbs.twimg.com/profile_images/770375041145987072/Pr4KhDXP_400x400.jpg",
  'canvas': "https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png",
  'powerschool': "https://wellesleyps.org/wms/wp-content/uploads/sites/16/2020/09/powerschool-P-logo.png"
}

export default function CurrentWorkflow({showWorkflow, lastBotMessage}) {
  if (showWorkflow){
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
  for (let i = 0; i < srcArrayHash.length; i++) {
    // This could probaby be done better. There should only be oe
    // K, V pair, so get the first key will be the tool
    var newtool = Object.keys(srcArrayHash[i])[0];
    console.log(Object.keys(srcArrayHash[i]));
    // Get the value with the newly found key
    var newSrc = srcArrayHash[i][newtool]
    var workflowElement = (
      <div className="tool-container">
        {newtool}
        <img className="integration-icon" src={newSrc}></img>
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
  const lowercase_msg_arrary = msg.toLowerCase().match( /[^\.!\?]+[\.!\?]+/g );
  var sentenceArrayHash = null;
  var finalArrayHash = [];
  var lastFinalArrayElem = null;
  // Remove most last check, we will just use indexAt and sort by index
  if (lowercase_msg_arrary === null) {return finalArrayHash;}
  for (let i = 0; i < lowercase_msg_arrary.length; i++) {
    // Get an array of hashes of tools : image
    sentenceArrayHash = CurrentWorkflow.parseSentence(lowercase_msg_arrary[i])
    // If the last element in the finalArrayHash is the first element in the next sentence Array, don't add the first element
    if (sentenceArrayHash.length > 0 && sentenceArrayHash[0] != lastFinalArrayElem){
      finalArrayHash = finalArrayHash.concat(sentenceArrayHash);
      lastFinalArrayElem = sentenceArrayHash[sentenceArrayHash.length - 1];
    }
  }
  // This should be an ordered array of tool dictionaries that are referenced in the response
  return finalArrayHash;
}

CurrentWorkflow.parseSentence = (sentence) => {
  const tools = Object.keys(TOOLDICTIONARY);
  const toolsUsed = [];
  // To DO: makes sense not to track most recently used. Will just use index at and then 
  // sort by first showing up.
  var mostRecentToolUsed = null;
  for (let i = 0; i < tools.length; i++) {
    if (sentence.indexOf(tools[i]) > -1 && mostRecentToolUsed != tools[i]){
      mostRecentToolUsed = tools[i];
      var newHash = {}
      newHash[tools[i]] = TOOLDICTIONARY[tools[i]]
      toolsUsed.push(newHash);
      console.log(toolsUsed);
    }
  }
  return toolsUsed;
}


CurrentWorkflow.toolDictionary = () => {
  return TOOLDICTIONARY;
}

CurrentWorkflow.tools = () => {
  return Object.keys(TOOLDICTIONARY);
}