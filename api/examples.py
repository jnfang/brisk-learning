
gettysburgWorksheetExample=  """
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
    """

lexileConversionExample = """
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

"""

exampleToolData = {
        "Automate Workflows": {
            "command": "Exempt absent students from today's worksheet and email their parents with a copy.",
            "tools": ["powerschool", "google classroom", "gmail"],
            "chat response": "Okay, I've used Powerschool to find the students who are absent today and exempted today's worksheet in Google Classroom. I've drafted an email to their parents for your approval //P// Powerschool: Find students who were absent today... //P// Google Classroom: Exempt today's worksheet for... //P// Gmail: Draft email to parents of absent students with the worksheet their students missed... ",
            "powerschool": "Natasha Ashai, Rohan Shah, and Jimmy Clay are absent today",
            "google classroom": "Will exempt Natasha Ashai, Rohan Shah, and Jimmy Clay from today's worksheet -- The Contrasting Themes of the Romantic Period",
            "gmail": "<s>Worksheet covered in class <b> Dear Parents, \n\nI hope this email finds you well. I wanted to let you know that your child was absent from class today, and as a result, missed the worksheet on The Contrasting Themes of the Romantic Period. \n\n I have attached the worksheet to this email, and although your child is exempt from completing it, I strongly encourage them to review the material covered. This will help ensure that they are fully caught up when they return to class. \n\n If you have any questions or concerns, please don't hesitate to reach out. \n\n Sincerely, \n\n Mr. Smith ",
        },
        "Rewrite News Articles": {
            "command": "Re-write the attached news article at 700L Lexile and attach it to the Romanticism Unit.",
            "tools": ["lexile converter", "google docs", "google classroom"],
            "chat response": "Okay, I've used Lexile Converter to re-write the attached news article at 700L Lexile and attached it to the Romanticism Unit. //P// Lexile Converter: Re-write the attached news article at 700L Lexile... //P// Google Docs: Creating a doc with the content //P// Google Classroom: Attach it to the Romanticism Unit...",
            "lexile converter": lexileConversionExample,
            "google docs": "",
            "google classroom": "Attached the re-written article to the Romanticism Unit",

        },
        "Use Tools Faster": {
            "command": "Didn't cover side angle side today, shift all assigments in the unit back a day",
            "tools": ["canvas"],
            "chat response": "Okay, I've used Canvas to shift all assignments in the unit back a day. //P// Canvas: Shifting all assignments in the Geometry of Triangles Unit back a day...",
            "canvas": "Changing dates of Geometry of Triangles assignments \nTriange Inequality Theorem: 9/14 -> 9/15 \n Pythagorean Theorem: 9/15 -> 9/16 \n Perpindicular Bisectors: 9/16 -> 9/17 \n Angle Bisectors: 9/17 -> 9/20 \n Medians and Cortoids: 9/20 -> 9/21 \n Altitudes and Medians: 9/21 -> 9/22 \n Triangle Congruence: 9/22 -> 9/23 ",
        },
        "Personalized Data Reports": {
            "command": "Create a chart of Charlie's performance on the last 4 assignments and email it to his parents.",
            "tools": ["aries", "data", "gmail"],
            "chat response": "Okay, I've used Aries to create a chart of Charlie's performance on the last 4 assignments and emailed it to his parents. //P// Aries: Creating a chart of Charlie's performance on the last 4 assignments... //P// Data: Creating a chart of Charlie's performance on the last 4 assignments... //P// Gmail: Emailed it to his parents... ",
            "aries": "Charlies performance on the last 4 assignments \nAssignment 1: 82% \nAssignment 2: 88% \nAssignment 3: 86% \nAssignment 4: 88%",
            "data": "Plotting performance data",
            "gmail": "Hi Elaine and Jeff, \n Following up on our conversation from last week, I've attached a chart of Charlie's performance on the last 4 assignments. \n\n If you have any questions or concerns, please don't hesitate to reach out. \n\n Sincerely, \n\n Mr. Smith",
        },
        "Detect AI Writing": {
            "command": "Flag recent essay submissions where students may have used GPT",
            "tools": ["google classroom", 'writing integrity'],
            "chat response": "Okay, I've used Google Classroom to find recent essay submissions and Writing Integrity to flag submissions where students may have used GPT. //P// Google Classroom: Find recent essay submissions... //P// Writing Integrity: Flag those where students may have used GPT... ",
            "google classroom": "Retrieved 5 recent essay submissions",
            "writing integrity": "Natasha spent 15 minutes editing her Romantacism essay in Google Docs. This is 93% shorter than other students. It's possible that she used GPT to write this essay.",
        },
        "Monitor Student Progress": {
            "command": "Every week email me students who have not completed the last 3 assignments in the unit",
            "tools": ["google classroom", "monitor", "gmail"],
            "chat response": "Okay, I've scheduled a monitor that checks Google Classroom every week and emails you a list of students who meet the criteria. //P// Monitor: Check Google Classroom Every Week... //P// Google Classroom: Find students who have not completed the last 3 assignments in the unit... //P// Gmail: Email you a list of students who meet the criteria... ",
            "google classroom": "Retrieved recent student submission data and found that Jimmy Clay has not completed the last 3 assignments in the unit",
            "monitor": "Scheduling a weekly monitor to check Google Classroom and email you an list of students who have not completed the last 3 assignments in the unit",
            "gmail": "<a Your Student Submissions Report <b> Jimmy Clay has not completed the last 3 assignments in the unit: https://classroom.google.com/u/0/w/MzExODE1NTAwMTMz/t/all",
        },
        "Create worksheets on any topic": {
            "command": "Generate a worksheet about the battle of gettysburg aligned with ca state standards.",
            "tools": ["curriculum", "google docs", "schoology"],
            "chat response": "Okay, I've used Curriculum to generate a worksheet about the Battle of Gettysburg aligned with California State Standards. //P// Curriculum: Generate a worksheet about the Battle of Gettysburg aligned with CA State Standards... //P// Google Docs: Creating a doc with the content //P// Schoology: Attach it to the unit... ",
            "curriculum": gettysburgWorksheetExample,
            "google docs": "https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing",
            "schoology": "Uploaded the worksheet to the Civil War Unit",
        },
        "Automate the first round of feedback": {
            "command": "Give feedback on grammar, sentence structure, content on the Hamlet papers.",
            "tools": ["google classroom", "feedback"],
            "chat response": "Okay, I've used Google Classroom to find the Hamlet papers and Feedback to give feedback on grammar, sentence structure, and content. //P// Google Classroom: Find the Hamlet papers... //P// Feedback: Give feedback on grammar, sentence structure, and content... ",
            "google classroom": "Identifying the Hamlet papers \n\n Hamlet Paper 1: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing \n\n Hamlet Paper 2: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing \n\n Hamlet Paper 3: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing \n\n Hamlet Paper 4: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing  \n\n Hamlet Paper 5: https://docs.google.com/document/d/1ESlOcz8hJAD7RFvViNxcUoMskxZMmZaQSpvo0ZjA7MY/edit?usp=sharing",
            "feedback": "Provided feedback on grammar, sentence structure, and content on the Hamlet papers.",
        }
}

def exampleCheck(tool, prompt): 
    for tup in exampleToolData.items():
        dic = tup[1]
        if prompt in dic['chat response'] and tool in dic['tools']:
            import time
            time.sleep(1)
            return dic[tool]
    return None
