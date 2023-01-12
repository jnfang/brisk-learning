export default function PreviewData(props) {
    var imgComponent = null;
    if (!!props.response && props.response.includes("chart")){
        imgComponent = <img src="https://daext.com/wp-content/uploads/2020/11/vertical-bar-chart-2.png"></img>;
        if (props.response.includes("pie")){
            imgComponent = <img src="https://daext.com/wp-content/uploads/2020/11/pie-chart-2.png"></img>;
        }
        if (props.response.includes("Charlie")){
            imgComponent = <img src="https://i.ibb.co/BgT5NdN/Charlie-Guo-Scores-and-Charlie-Guo-Absences.png"></img>;
            if (props.response.includes("axes") || props.response.includes("axis")){
                imgComponent = <img src="https://i.ibb.co/f1ppLBk/Charlie-Guo-Scores-and-Charlie-Guo-Absences-1.png"></img>;
            }
            if (props.response.includes("time")){
                imgComponent = <img src="https://i.ibb.co/02m06C2/Charlie-Guo-Scores-and-time-spent-2.png"></img>;
            }
            if (props.response.includes("pie")){
                imgComponent = <img src="https://i.ibb.co/g9YnWFN/Charlie-Guo-Scores-and-time-spent-1.png"></img>;
            }
            if (props.response.includes("line")){
                imgComponent = <img src="https://i.ibb.co/3sQQb99/Charlie-Guo-Scores-and-time-spent.png"></img>;
            }
        }
    }
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
                {imgComponent}
            </div>
        )
    }
}