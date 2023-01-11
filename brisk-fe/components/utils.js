import { faDiagramNext,
    faLayerGroup,
    faKeyboard,
    faChartSimple,
    faRobot, 
    faBinoculars,
    faFilePen,
    faComment,
    faPersonChalkboard,
    faForwardFast
} from "@fortawesome/free-solid-svg-icons"


export const envServerURL = process.env.NEXT_PUBLIC_SERVER || "https://brisk-edu.onrender.com/"

// Returns the cleaned up LLM response that will be displayed in chat
export async function invokeChatResponse(input, previous_context, setStateCallback, attachments, exampleState) {
    const chatEndpoint = envServerURL+ "chat";
    let llmResponse;
    if (exampleState) {
        // Based on the title of the tool, get the chat response
        llmResponse = exampleToolData[exampleState]["chat response"];

    } else {
        localStorage["lastBotMessage"] = null;
        const data = {
            prompt: input,
            previous_context: ""
        }
        const res = await fetch(chatEndpoint, {
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        llmResponse = result.llmResponse;
    }

    // Need to update this to use chatbot's save message method
    localStorage["lastBotMessage"] = llmResponse;
    var firstPromptIndex = llmResponse.indexOf("//P//");
    let cleanedLlmResponse;
    if (firstPromptIndex > -1) {
        cleanedLlmResponse = llmResponse.substring(0, firstPromptIndex);
    }else{
        cleanedLlmResponse = llmResponse;
    }
    setStateCallback(cleanedLlmResponse);
    return cleanedLlmResponse;
}


export async function invokeTool(requestHash, setResponseData, prevResponseData) {
    const toolContext = prevResponseData.map((h) => {return h["prompt"] + " " + h.toolResponse.toolResponse}).join("\n");
    const request_tool = requestHash["tool"];
    const request_prompt = requestHash["prompt"];
    const attachments = requestHash["attachments"];
    const invokeToolEndpoint = envServerURL + "invoke_tool";

    const data = {
        tool: request_tool,
        prompt: request_prompt,
        attachments: {...attachments, "toolContext": toolContext}
    }
    console.log("making request");
    console.log(data);
    const res = await fetch(invokeToolEndpoint, {
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
        method: 'POST',
    });
    const result = await res.json();

    setResponseData({...requestHash, "toolResponse": result});
    sessionStorage[request_tool+request_prompt] = JSON.stringify(result);
    return null;
}

const lexileConversionExample = `
Queen Elizabeth II ruled the United Kingdom for more than 70 years. She died on September 8 at Balmoral Castle. This was her summer home. She was 96.

Elizabeth became queen in February 1952. This was after her father, King George VI, died. She helped her country through hard times and major world events.

Curved timeline graphic showing the life of Queen Elizabeth II. Life events and historical events are represented on the timeline.
Image 2. A timeline of Queen Elizabeth II's life.

Elizabeth Was A Fixture For Decades
Her last act as queen was on September 6, 2022. She let Prime Minister Boris Johnson leave his job. She asked the new prime minister, Liz Truss, to form a new government. To make a new government, Truss first finds people to help her make good choices for Britain.  

In over 1,000 years of English rule, Elizabeth's reign was the longest. She kept a promise made on her 21st birthday. She said she would devote all of her life to serving her country. 

She Never Expected To Be Queen
Elizabeth Alexandra Mary Windsor was born on April 21, 1926. Her mother was from Scottish aristocracy. Her father was the second son of King George V. Princess Elizabeth's sister, Margaret Rose, was born four years later.

When Elizabeth was 10, her uncle, Edward, gave up the crown. Edward's brother became King George VI. She now had king for a father. She would be queen one day.

The royal family sits on a royal couch, posing for a photo. Left to right: Princess Anne, Prince Andrew, Prince Philip, Queen Elizabeth, Prince Edward and Prince Charles.Zoom-in
Image 3. The royal family in 1972. (Left to right) Princess Anne, Prince Andrew, Prince Philip, Queen Elizabeth II, Prince Edward and Prince Charles. Photo: Fox Photos/Hulton Archive/Getty Images

During World War II, Elizabeth stayed in England. She joined the army.

Her husband was Prince Philip. He was a great-great-grandchild of Queen Victoria and the son of a Greek prince. 

They married on November 20, 1947. It was a fairy-tale event between a princess and a naval officer. 

Elizabeth had four children. They are Prince Charles (1948), Princess Anne (1950), Prince Andrew (1960) and Prince Edward (1964). With Elizabeth's death, her oldest child, Prince Charles, will be the new ruler of the United Kingdom. He will be known as King Charles III. 

Black and white photo of a young queen elizabeth II during her coronation in 1953.Zoom-in
Image 4. Queen Elizabeth II ascended to the crown at the age of 25 after the death of her father, George VI. It was the first televised coronation. Photo: Universal History Archive/Getty Images

Elizabeth and Philip had thought her father would rule a long time. They expected to have a fairly normal life. In the winter of 1952, the king died.

Elizabeth was now queen. She was crowned in Westminster Abbey on June 2, 1953. 

Elizabeth helped many prime ministers. They traveled each Tuesday to Buckingham Palace to see her.

"We Are All Visitors To This Time, This Place"
In those meetings, she offered tips. They came from her life and understanding of leaders and other people.  

At Balmoral, the public saw how Elizabeth might be had she not become queen. She would be a nice, English countrywoman in green, rubber boots. Her dogs would follow her around. 

Old photo of a middle aged Queen Elizabeth II smiling next to her pet corgi.Zoom-in
Image 5. The queen was an avid lover of corgis. Throughout her life, the queen owned more than 30 of them. Photo: Bettmann/Getty Images

When talking to leaders in 2011 in Australia, Elizabeth said this:

"We are all visitors to this time, this place. Our purpose here is to observe, to learn, to grow, to love ... and then we return home."

`

const gettysburgWorksheetExample = `

I've found the CA state standards for 8th grade history here: https://www.cde.ca.gov/be/st/ss/documents/histsocscistnd.pdf

Title: The Battle of Gettysburg: A Turning Point in the Civil War

Directions: Read the following passage and answer the questions below.

The Battle of Gettysburg was a turning point in the American Civil War. It took place in July of 1863 in the town of Gettysburg, Pennsylvania. Union General George Meade led his troops against Confederate General Robert E. Lee's army. The battle lasted three days and resulted in 51,000 casualties.

On the first day, Union forces were able to repel the Confederate attack and hold their ground on Cemetery Ridge. On the second day, the Confederates made a strong push and were able to take control of Culp's Hill and part of Cemetery Ridge. On the third day, the Union army made a counterattack and was able to push the Confederates back. This final push ended the battle and resulted in a Union victory.

The Battle of Gettysburg was a major victory for the Union and is considered a turning point in the Civil War. It marked the end of Confederate General Robert E. Lee's invasion of the North and the beginning of the end of the war.

Questions:

Where did the Battle of Gettysburg take place?
Who led the Union army in the battle?
How many days did the battle last?
What happened on the first day of the battle?
What happened on the second day of the battle?
What happened on the third day of the battle?
Why is the Battle of Gettysburg considered a turning point in the Civil War?
How many casualties were there in the Battle of Gettysburg?

`

export const exampleToolData = {
    "Automate Workflows": {
        "command": "Exempt absent students from today's worksheet and email their parents with a copy.",
        "tools": ["powerschool", "google classroom", "gmail"],
        "chat response": "Okay, I've used Powerschool to find the students who are absent today and exempted today's worksheet in Google Classroom. I've drafted an email to their parents for your approval //P// Powerschool: Find students who were absent today... //P// Google Classroom: Exempt today's worksheet for... //P// Gmail: Draft email to parents of absent students with the worksheet their students missed...",
        "powerschool": "Natasha Ashai, Rohan Shah, and Jimmy Clay are absent today",
        "google classroom": "Will exempt Natasha Ashai, Rohan Shah, and Jimmy Clay from today's worksheet -- The Contrasting Themes of the Romantic Period",
        "gmail": "<s>Worksheet covered in class <b> Dear Parents, \n\nI hope this email finds you well. I wanted to let you know that your child was absent from class today, and as a result, missed the worksheet on The Contrasting Themes of the Romantic Period. \n\n I have attached the worksheet to this email, and although your child is exempt from completing it, I strongly encourage them to review the material covered. This will help ensure that they are fully caught up when they return to class. \n\n If you have any questions or concerns, please don't hesitate to reach out. \n\n Sincerely, \n\n Mr. Smith ",
        icon: faDiagramNext,
    },
    "Rewrite News Articles": {
        "command": "Re-write the attached news article at 700L Lexile and attach it to the Romanticism Unit.",
        "tools": ["lexile converter", "google docs", "google classroom"],
        "chat response": "Okay, I've used Lexile Converter to re-write the attached news article at 700L Lexile and attached it to the Romanticism Unit. //P// Lexile Converter: Re-write the attached news article at 700L Lexile... //P// Google Docs: Creating a doc with the content //P// Google Classroom: Attach it to the Romanticism Unit...",
        "lexile converter": lexileConversionExample,
        "google docs": "",
        "google classroom": "Attached the re-written article to the Romanticism Unit",
        icon: faKeyboard,

    },
    "Use Tools Faster": {
        "command": "Didn't cover side angle side today, shift all assigments in the unit back a day",
        "tools": ["canvas"],
        "chat response": "Okay, I've used Canvas to shift all assignments in the unit back a day. //P// Canvas: Shifting all assignments in the Geometry of Triangles Unit back a day...",
        "canvas": "Changing dates of Geometry of Triangles assignments \nTriange Inequality Theorem: 9/14 -> 9/15 \n Pythagorean Theorem: 9/15 -> 9/16 \n Perpindicular Bisectors: 9/16 -> 9/17 \n Angle Bisectors: 9/17 -> 9/20 \n Medians and Cortoids: 9/20 -> 9/21 \n Altitudes and Medians: 9/21 -> 9/22 \n Triangle Congruence: 9/22 -> 9/23 ",
        icon: faForwardFast,
    },
    "Personalized Data Reports": {
        "command": "Create a chart of Charlie's performance on the last 4 assignments and email it to his parents.",
        "tools": ["aries", "data", "gmail"],
        "chat response": "Okay, I've used Aries to create a chart of Charlie's performance on the last 4 assignments and emailed it to his parents. //P// Aries: Creating a chart of Charlie's performance on the last 4 assignments... //P// Data: Creating a chart of Charlie's performance on the last 4 assignments... //P// Gmail: Emailed it to his parents... ",
        "aries": "Charlies performance on the last 4 assignments \nAssignment 1: 82% \nAssignment 2: 88% \nAssignment 3: 86% \nAssignment 4: 88%",
        "data": "Plotting performance data",
        "gmail": "Hi Elaine and Jeff, \n Following up on our conversation from last week, I've attached a chart of Charlie's performance on the last 4 assignments. \n\n If you have any questions or concerns, please don't hesitate to reach out. \n\n Sincerely, \n\n Mr. Smith",
        icon: faChartSimple
    },
    "Detect AI Writing": {
        "command": "Flag recent essay submissions where students may have used GPT",
        "tools": ["google classroom", 'writing integrity'],
        "chat response": "Okay, I've used Google Classroom to find recent essay submissions and Writing Integrity to flag submissions where students may have used GPT. //P// Google Classroom: Find recent essay submissions... //P// Writing Integrity: Flag those where students may have used GPT... ",
        "google classroom": "Retrieved 5 recent essay submissions",
        "writing integrity": "Natasha spent 15 minutes editing her Romantacism essay in Google Docs. This is 93% shorter than other students. It's possible that she used GPT to write this essay.",
        icon: faRobot
    },
    "Monitor Student Progress": {
        "command": "Every week email me students who have not completed the last 3 assignments in the unit",
        "tools": ["google classroom", "monitor", "gmail"],
        "chat response": "Okay, I've scheduled a monitor that checks Google Classroom every week and emails you a list of students who meet the criteria. //P// Monitor: Check Google Classroom Every Week... //P// Google Classroom: Find students who have not completed the last 3 assignments in the unit... //P// Gmail: Email you a list of students who meet the criteria... ",
        "google classroom": "Retrieved recent student submission data and found that Jimmy Clay has not completed the last 3 assignments in the unit",
        "monitor": "Scheduling a weekly monitor to check Google Classroom and email you an list of students who have not completed the last 3 assignments in the unit",
        "gmail": "<a Your Student Submissions Report <b> Jimmy Clay has not completed the last 3 assignments in the unit: https://classroom.google.com/u/0/w/MzExODE1NTAwMTMz/t/all",
        "icon": faBinoculars
    },
    "Create worksheets on any topic": {
        "command": "Generate a worksheet about the battle of gettysburg aligned with ca state standards.",
        "tools": ["curriculum", "google docs", "schoology"],
        "chat response": "Okay, I've used Curriculum to generate a worksheet about the Battle of Gettysburg aligned with California State Standards. //P// Curriculum: Generate a worksheet about the Battle of Gettysburg aligned with CA State Standards... //P// Google Docs: Creating a doc with the content //P// Schoology: Attach it to the unit... ",
        "curriculum": gettysburgWorksheetExample,
        "google docs": "https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing",
        "schoology": "Uploaded the worksheet to the Civil War Unit",
        icon: faFilePen
    },
    "Automate the first round of feedback": {
        "command": "Give feedback on grammar, sentence structure, content on the Hamlet papers.",
        "tools": ["google classroom", "feedback"],
        "chat response": "Okay, I've used Google Classroom to find the Hamlet papers and Feedback to give feedback on grammar, sentence structure, and content. //P// Google Classroom: Find the Hamlet papers... //P// Feedback: Give feedback on grammar, sentence structure, and content... ",
        "google classroom": "Identifying the Hamlet papers \n\n Hamlet Paper 1: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing \n\n Hamlet Paper 2: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing \n\n Hamlet Paper 3: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing \n\n Hamlet Paper 4: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing  \n\n Hamlet Paper 5: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing",
        "feedback": "Provided feedback on grammar, sentence structure, and content on the Hamlet papers.",
        icon: faComment
    }

};

export const getCachedResponse = (tool, command) => {
  let singleExampleHash;
  Object.keys(exampleToolData).forEach((key) => {
    singleExampleHash = exampleToolData[key];
    if (tool in singleExampleHash.tools &&  singleExampleHash["chat response"].includes(command)) {
      return singleExampleHash[tool];
    }
  });
}

export const TOOLDESCRIPTIONS = {
    'youtube': {
      'imageUrl': "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
      'name': "Youtube",
      'description': "YouTube is a video-sharing website that teachers can use to share educational videos with their students. Teachers can also use YouTube to create their own videos for use in the classroom."
    },
    'google meet': {
      'imageUrl': "https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg",
      'name': "Google Meet",
      'description': "Google Meet is a video conferencing tool that teachers can use to hold online meetings with their students. Teachers can use Meet to hold virtual office hours, review assignments, or hold virtual lectures."
    },
    'google slides': {
      'imageUrl': "https://media.flaticon.com/dist/min/img/landing/gsuite/slides.svg",
      'name': "Google Slides",
      'description': "Google Slides is a web-based presentation application developed by Google."
    },
    'google docs': {
      'imageUrl': "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg",
      'name': "Google Docs",
      'description': "Google Docs is a word processor included as part of a free, web-based software office suite offered by Google. It allows collaborative editing of documents in real time."
    },
    'google sheets': {
      'imageUrl': "https://media.flaticon.com/dist/min/img/landing/gsuite/sheets.svg",
      'name': "Google Sheets",
      'description': "Google Sheets is a spreadsheet program included as part of a free, web-based software office suite offered by Google. It allows collaborative editing of spreadsheets in real time."
    },
    'google classroom': {
      'imageUrl': "https://cdn.worldvectorlogo.com/logos/google-classroom.svg",
      'name': "Google Classroom",
      'description': "Google Classroom is a web-based platform that teachers can use to create and organize assignments, send announcements and messages, and track class progress. Teachers can also use Classroom to grade assignments and provide feedback to students."
    },
    'gmail': {
      'imageUrl': "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
      'name': "Gmail",
      'description': "Gmail is an email service that teachers can use to communicate with students and other teachers. Teachers can use Gmail to send and receive emails, and to schedule and organize emails using labels and folders."
    },
    'zoom': {
      'imageUrl': "https://www.yourstrategic.com/wp-content/uploads/2021/11/Zoom-Icon.png",
      'name': "Zoom",
      'description': "Zoom is a video conferencing service that can be used for teleconferencing, telecommuting, distance education, and social relations."
    },
    'google drive': {
      'imageUrl': "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/2295px-Google_Drive_icon_%282020%29.svg.png",
      'name': "Google Drive",
      'description': "Google Drive is a file storage and synchronization service developed by Google. It allows users to store files in the cloud, share files, and edit documents, spreadsheets, and presentations with collaborators."
    },
    'google calendar': {
      'imageUrl': "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
      'name': "Google Calendar",
      'description': "Google Calendar is a time-management and scheduling tool that teachers can use to create and manage events and appointments. Teachers can use Calendar to schedule class time, office hours, and other appointments, and to share their schedule with students."
    },
    'clever': {
      'imageUrl': "https://images.squarespace-cdn.com/content/v1/59d3e365f43b55815a1bad33/1598978265798-V9XFUYOUCY6YY0XO8XBR/image-asset.png",
      'name': "Clever",
      'description': "Clever is a platform that connects teachers and students with educational resources and apps. Teachers can use Clever to access and assign online resources and apps to their students, and to track student progress."
    },
    'remind': {
      'imageUrl': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRGVCxXrMYevZYjNcNPbK55jhxTk9fBHtm8Q&usqp=CAU",
      'name': "Remind",
      'description': "Remind is a communication tool that teachers can use to send messages to students and parents. Teachers can use Remind to send announcements, reminders, and other messages to keep students and parents informed."
    },
    'schoology': {
      'imageUrl': "https://img.icons8.com/plasticine/400/schoology.png",
      'name': "Schoology",
      'description': "Schoology is a learning management system that teachers can use to create and manage course materials and assignments. Teachers can use Schoology to create and distribute assignments, provide feedback, and track student progress."
    },
    'aries': {
      'imageUrl': "https://pbs.twimg.com/profile_images/770375041145987072/Pr4KhDXP_400x400.jpg",
      'name': "Aries",
      'description': "Aeries is a student information system that teachers can use to access and update student data. Teachers can use Aeries to view student information, grades, and attendance, and to enter grades and attendance data."
    },
    'canvas': {
      'imageUrl': "https://www.instructure.com/sites/default/files/image/2021-12/Canvas_logo_single_mark.png",
      'name': "Canvas",
      'description': "Canvas is a learning management system that teachers can use to create and manage course materials and assignments. Teachers can use Canvas to create and distribute assignments, provide feedback, and track student progress."
    },
    'powerschool': {
      'imageUrl': "https://wellesleyps.org/wms/wp-content/uploads/sites/16/2020/09/powerschool-P-logo.png",
      'name': "PowerSchool",
      'description':"PowerSchool is a student information system that teachers can use to access and update student data. Teachers can use PowerSchool to view student information, grades, and attendance, and to enter grades and attendance data."
    },
    'wikipedia': {
      'imageUrl': "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png",
      'name': "Wikipedia",
      'description': "Wikipedia is an online encyclopedia that teachers can use as a resource for research and information on a wide range of topics. Teachers can use Wikipedia to find articles and information to use in the classroom or to recommend to students for research projects."
    },
    'curriculum': {
      'imageUrl': "https://www.citypng.com/public/uploads/preview/hd-purple-round-pencil-icon-png-171630368416vlipzv1qyr.png",
      'name': "Curriculum",
      'description': "Curriculum is a tool that uses generative AI to help teachers create content for lesson plans, worksheets, resources, quizzes, and more. The content can be generated in Google Docs, Slides, and other tools."
    },
    'data': {
      'imageUrl': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKfp_Aguqo9ljbIMjZZVlZjnHSgkxWVLLXwg&usqp=CAU",
      'name': "Data",
      'description': "Data is a tool that allows teachers to use data from various sources, such as Google Classroom, Google Sheets, and more, to create charts and visualizations. These charts and visualizations can help teachers better understand and track student progress."
    },
    'lexile converter': {
      'imageUrl': "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Eo_circle_purple_arrow-up-down.svg/2048px-Eo_circle_purple_arrow-up-down.svg.png",
      'name': "Lexile Converter",
      'description': "Lexile Converter is a tool that allows teachers to convert any text to text of a specific Lexile level. This can help teachers tailor reading materials to the appropriate level for their students."
    },
    'writing integrity': {
      'imageUrl': "https://miro.medium.com/max/1400/0*F9ptwf7KyiVfrX0x.jpg",
      'name': "Writing Integrity",
      'description': "Writing Integrity is a tool that looks at folders of student work and flags documents that may be plagiarized or may have been created using automated tools like GPT-3. This can help teachers identify and address instances of academic dishonesty in their classrooms."
    },
    'lesson planner': {
      'imageUrl': "https://static.vecteezy.com/system/resources/previews/012/319/315/original/clipboard-multicolor-circle-line-inverted-icon-vector.jpg",
      'name': "Lesson Planner",
      'description': "Lesson Planner is a tool that allows you to create lesson plans for your students."
    },
    'feedback': {
      'imageUrl': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlM19sO3G9DCLc0-BaRMW7VzfsLxXQq_DGWIM6tSq2mZSj9Nab_K4BfAsxg197S6Lji3o&usqp=CAU",
      'name': "Feedback",
      'description': "Feedback is a tool that provides automated feedback on student submissions based on how the teacher has given feedback in the past. The goal of Feedback is to save teachers time and improve the efficiency of the feedback process."
    },
    'monitor': {
      'imageUrl': "https://cdn2.iconfinder.com/data/icons/advertising-agency-wildberry-vol-1/256/Frequency-512.png",
      'name': "Monitor",
      'description': "Monitor is a tool that allows teachers to schedule workflows and receive notifications when certain metrics reach certain thresholds. This can help teachers stay up-to-date on important data and track student progress."
    },
  }



 