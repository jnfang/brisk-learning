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
import { exampleToolData } from "./utils"

export default function ExampleContainer(props){
    const exampleCards = []
    const exampleTitles = Object.keys(exampleToolData);

    exampleTitles.forEach((title) => {
        const hash = exampleToolData[title];
        exampleCards.push(
            <ExampleCard
                handleExampleClick={props.handleExampleClick}
                title={title}
                description={hash.command}
                icon={hash.icon}
                tools={hash.tools}
                key={title}
            />
        )
    }
    )
    return (
        <div className="container max-w-xl m-auto flex flex-wrap flex-col md:flex-row items-center justify-start">
            {exampleCards}
        </div> 
    )
}