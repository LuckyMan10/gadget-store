import "./NotificationModal.scss";
import React, { useEffect } from 'react';
import {notificationType} from "types"


const NotificationModal: React.FC<notificationType> = ({ message, visible, setVisible }) => {
    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 3200);
    }, [visible]);
    return (
        <article className={`notificationModal ${visible ? 'visible' : ''}`}>
            <div className="notificationModal__wrapper">
                <h1>{message}</h1>
            </div>
        </article>
    )
}

export {
    NotificationModal
}