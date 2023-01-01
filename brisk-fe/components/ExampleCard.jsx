import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TOOLDICTIONARY } from "./CurrentWorkflow"

export default function ExampleCard(props) {

  const toolItem = (tool) => {
    return (<img key={tool} className="h-5 x-5"src={TOOLDICTIONARY[tool]} /> )
  }

  const handleExampleClick = (e) => {
    // Create a dictionary that will be used to populate the workflow query
    e.stopPropagation();
    if (props.description && props.tools) {
      const exampleDict ={
        "exampleMessage": props.description,
        "tools": props.tools,
      }
      props.handleExampleClick(exampleDict);
    }
  }

  return (
    <div onClick={props.handleExampleClick} className="grow text-ellipsis overflow-hidden tool-container basis-5/12 flex flex-row bg-white border border-gray-300 rounded shadow-lg appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline">
        <div className="w-32 h-40 flex flex-row basis-1/4 justify-center items-center" >
          <FontAwesomeIcon
              className="example-icon w-28 h-28 "
              icon={props.icon}
          />
        </div>
        <div className="basis-3/4 flex flex-col justify-between grow px-2 text-left h-full">
            <div className="grow">
              <h2 className="text-xl font-bold">{props.title}</h2>
              <p className="text-base text-gray-700 md:text-md italic">"{props.description}"</p>
            </div>
            <button className="outline-purple flex flex-row bg-slate-200 px-2 py-2 rounded-md my-2 justify-between hover:outline-2" onClick={handleExampleClick}>
              <div><b>Try this example</b></div>
              <div className="flex flex-row gap-1">
                {props.tools.map(item => toolItem(item))}
              </div>
            </button>
        </div>
    </div>
  )
}