export default function PreviewGoogleDrive(props) {
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
                <div className="flex">
                    <GoogleDocComponent />
                    <div className="px-1"></div>
                    <GoogleSlideComponent />
                </div>
            </div>
        )
    }
}