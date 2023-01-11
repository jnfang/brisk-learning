import { GoogleDocComponent } from "./previewComponents"

export default function PreviewGoogleDocs(props) {
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
                <GoogleDocComponent />
            </div>
        )
    }
}