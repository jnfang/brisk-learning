export default function PreviewLexileConverter(props) {
    if (props.response === null) {
        return (
            <div className="flex loader-container">
                <div className="loader"></div>
            </div>
        )
    } else {
        return (
            <div className="email-container">
                {/* <FontAwesomeIcon
                      className="absolute box-border h-5 w-5 copy-btn"
                      icon={faCopy}
                      onClick={copyToClipboard}
                /> */}
                <div>
                    {props.response}
                </div>

            </div>
        )
    }
}