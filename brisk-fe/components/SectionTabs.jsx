import { useState } from "react";

export default function SectionTabs(props) {
    const [openTab, setOpenTab] = useState(props.openTab);
    const [tabs, setTabs] = useState(props.tabs);
    // There will be default tabs, which are "Integrations", "Current workflow", "Scheduled workflows"

    const handleTabClick = (e) => {
        e.preventDefault();
        setOpenTab(e.target.text);
        props.onTabClick(e.target.text)
    }

    const tabArray = tabs.map((tab) => {
        return (
        <li className="mr-2" key={tab}>
            {tab === openTab ? 
                <a onClick={handleTabClick} href="#" aria-current="page" className="inline-block p-4 text-indigo-700 border-b-2 border-indigo-700 rounded-t-lg active dark:text-blue-500 dark:border-blue-500">{tab}</a>
                : <a onClick={handleTabClick} href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">{tab}</a>
            }
        </li>
        )
    });


    return (
        <ul className="flex flex-wrap px-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {tabArray}
        </ul>
    );
};