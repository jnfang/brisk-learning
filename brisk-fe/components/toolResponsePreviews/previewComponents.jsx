const GoogleDocComponent = (docUrl, title) => {
    docUrl = "https://docs.google.com/document/d/1SyqxM7VHj3sSwfObuQoLaDoCtC9UX6DeLqNpbHf4MCc/edit?usp=sharing";
    const src = "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg"
    title = "The Contrasting Themes of the Romantic Period";
    return (
        <div className="google-doc-container rounded flex">
            <div className="bg-slate-200 rounded flex px-1 py-1">
                <img className="fileShortCutImg" src={src} />
                <div className="fileShortCutTitle px-2 font-semibold py-1">
                    <a href={docUrl} target="_blank" rel="noopener noreferrer">{title}</a>
                </div>
            </div>
        </div>
    )
}

const GoogleSlideComponent = (docUrl) => {
    docUrl = "https://docs.google.com/presentation/d/1WiitB8CBijz0SaLZRlbaMubJcelM5IgP6H9yZNtLEOc/edit?usp=sharing";
    const src = "https://media.flaticon.com/dist/min/img/landing/gsuite/slides.svg"
    return (
        <div className="google-doc-container rounded flex">
            <div className="bg-slate-200 rounded flex px-1 py-1">
                <img className="fileShortCutImg" src={src} />
                <div className="fileShortCutTitle px-2 font-semibold py-1">
                    <a href={docUrl} target="_blank" rel="noopener noreferrer">Google Slide</a>
                </div>
            </div>
        </div>
    )
}

export {GoogleDocComponent, GoogleSlideComponent};