
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faTrash, faHeart, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

export default function WorkflowOptions(props) {

    const onSave = () => {
        props.onSave();
    }
    const onSchedule = () => {
        props.onSchedule();
    }
    const onReset = () => {
        props.onReset();
    }

    return (
        <div className='pt-2 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400'>
                <button onClick={onSave} className="border  rounded px-2 	mx-1 my-1 hover:bg-slate-100">
                  <FontAwesomeIcon
                    className="box-border h-4 w-4 px-1"
                    icon={faHeart}
                  />
                  Save
                </button>
                <button onClick={onSchedule} className="border rounded px-2 mx-1 my-1 hover:bg-slate-100">
                  <FontAwesomeIcon
                    className="box-border h-4 w-4 px-1"
                    icon={faCalendarDays}
                  />
                  Schedule
                </button>
                <button onClick={onReset} className="border rounded px-2 	mx-1 my-1 hover:bg-slate-100">
                    <FontAwesomeIcon
                        className="box-border h-4 w-4 px-1"
                        icon={faTrash}
                    />
                  Reset
                </button>
              </div>
    )
}