export default function PreviewData(props) {
    if (props.response === null) {
        return (
            <div className="flex loader-container">
                <div className="loader"></div>
            </div>
        )
    } else {
        return (
            <div className="email-container">
                {props.response}
                <img src="https://daext.com/wp-content/uploads/2020/11/vertical-bar-chart-2.png"></img>
            </div>
        )
    }
}