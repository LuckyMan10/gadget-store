import "./NotificationModal.scss";

interface notificationI {
    message: string;
    visible: boolean;
}


export const NotificationModal = ({message, visible}: notificationI) => {
    return (
        <article className={`notificationModal ${visible ? 'visible' : ''}`}>
            <div className="notificationModal__wrapper">
                <h1>{message}</h1>
            </div>
        </article>
    )
}