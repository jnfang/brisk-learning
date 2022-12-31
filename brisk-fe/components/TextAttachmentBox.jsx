import React, { useState } from 'react';

export default function TextAttachmentBox(props) {
    const [text, setText] = useState(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(text);
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        props.onCancel();
    }

    return (
        <div  className="text-left w-full mb-4 ">
                <div>
                    <p className="text-base text-gray-700 md:text-lg">
                    Attach text or data to this task.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="main-form w-full mb-4 md:flex-row">
                    <textarea
                        placeholder="Attach text or data to this task..."
                        required=""
                        rows="8"
                        type="text"
                        name='text'
                        onChange={handleTextChange}
                        className="flex-grow w-full h-40  mb-3 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                    />
                    <div>
                        <button
                            type="submit"
                            className="start-button float-right h-12 px-4 tracking-wide transition duration-200 rounded shadow-md md:w-auto focus:outline-none"
                        >
                            Attach
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="attach-button float-right h-12 px-4 tracking-wide transition duration-200 rounded shadow-md md:w-auto focus:outline-none"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
        </div>
    )
  }