import ExampleCard from "./ExampleCard"
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

export default function ExampleContainer(props){

    return (
        <div className="container max-w-xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Automate workflows"
                description="Exempt absent students from today's worksheet and email their parents with a copy."
                image="https://i.ibb.co/nQGJDNb/Section-1.png"
                link="https://www.google.com"
                icon={faDiagramNext}
                tools={["powerschool", "google classroom", "gmail"]}
            />
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Rewrite News Articles"
                description="Re-write the attached news article at 700L Lexile and attach it to the Romanticism Unit."
                image="https://i.ibb.co/kJjprq1/Section-2lexiledoccanvas.png"
                link="https://www.google.com"
                icon={faKeyboard}
                tools={["lexile converter", "google docs", "google classroom"]}

            />
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Use tools faster"
                description="Didn't cover side angle side today, shift all assigments in the unit back a day"
                image="https://i.ibb.co/zhgbgyH/GClass-Aries-Datalexilemail.png"
                link="https://www.google.com"
                icon={faForwardFast}
                tools={["canvas"]}

            />
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Personalized Data Reports"
                description="Create a chart of Charlie's performance on the last 4 assignments and email it to his parents."
                image="https://i.ibb.co/zhgbgyH/GClass-Aries-Datalexilemail.png"
                link="https://www.google.com"
                icon={faChartSimple}
                tools={["aries", "google classroom", "data"]}

            />
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Detect AI-writing"
                description="Verify that students did their recent essay submissions without AI-writing assistance."
                image="https://i.ibb.co/YpZSzjQ/GDrive-Detectorlexilemail.png"
                link="https://www.google.com"
                icon={faRobot}
                tools={["google classroom", "writing authentication"]}
            />
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Monitor student progress"
                description="Send me an email if a student hasn't submitted three assignments in a row."
                image="https://i.ibb.co/80s3BZf/Monitor-studentlexilemail.png"
                link="https://www.google.com"
                icon={faBinoculars}
                tools={["google classroom", "monitor", "gmail"]}

            />
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Create worksheets on any topic"
                description="Generate a worksheet about the battle of gettysburg aligned with ca state standards."
                image="https://i.ibb.co/18Fn1wp/Worksheet-Doclexilemail-1.png"
                link="https://www.google.com"
                icon={faFilePen}
                tools={["curriculum", "google docs", "schoology"]}
            />
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title="Automate the first round of feedback"
                description="Give feedback on grammar, sentence structure, content on the Hamlet papers."
                image="https://i.ibb.co/sVKLZzR/Feedback-REALfeedbackdrive.png"
                link="https://www.google.com"
                icon={faComment}
                tools={["google classroom", "feedback"]}
            />
            {/* <ExampleCard
                title="Lesson Plan in Minutes"
                description="Lesson Plan"
                image="https://i.ibb.co/hWmLXkV/Lesson-Plannerlexilemail.png"
                link="https://www.google.com"
                icon={faPersonChalkboard}
                tools={["powerschool", "google classroom", "email"]}
            /> */}
        </div>
    )
}
