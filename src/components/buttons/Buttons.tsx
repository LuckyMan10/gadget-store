
type ClickButtonType = {
    text?: string,
    img?: string,
    id: string
}

export const DynamicButtonComponent = ({text, img, id}: ClickButtonType) => {
    return (
        <button id={id} className="clickButton">
            {img && <img id={id} src={img} alt="icon button" />}
            {text && <span id={id}>{text}</span>}
        </button>
    )
}