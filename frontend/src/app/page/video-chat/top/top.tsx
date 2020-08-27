import React, { useEffect } from 'react';

import styles from './top.module.scss';

interface Props {
    lessonTitle: string;
    teacher: string | null;
    endTime: string | null;
    startTime: string | null;
}

const getTimeLeft = (endTime: string) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const endSeconds: number =
        endTime && parseInt(endTime.substr(0, 2), 10) * 60 * 60 +
        parseInt(endTime.substr(3, 2), 10) * 60;
    const nowSeconds: number = hours * 60 * 60 + minutes * 60 + seconds;

    const leftSeconds = endSeconds - nowSeconds;
    if (leftSeconds > 0) {
        const sec = Math.floor(leftSeconds % 60 / 10) === 0 ? `0${Math.floor(leftSeconds % 60)}` : `${Math.floor(leftSeconds % 60)}`;
        return `${Math.floor((leftSeconds / 60) % 60)}:${sec}`;
    } else {
        return '00:00';
    }
};

const Top: React.FC<Props> = ({ lessonTitle, teacher, startTime, endTime }) => {
    let timeLeft = getTimeLeft(endTime);

    useEffect(() => {
       const check = setInterval(() => {
            timeLeft = getTimeLeft(endTime);
            // console.log('check time left');
            }, 1000);

        return () => clearInterval(check);
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <h1>
                    {lessonTitle}
                </h1>
                <p>With {teacher}</p>
            </div>
            <div className={styles.right}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0)">
                        <path d="M15 0C6.71652 0 0 6.71652 0 15C0 23.2835 6.71652 30 15 30C23.2835 30 30 23.2835 30 15C30 6.71652 23.2835 0 15 0ZM15 27.4554C8.12277 27.4554 2.54464 21.8772 2.54464 15C2.54464 8.12277 8.12277 2.54464 15 2.54464C21.8772 2.54464 27.4554 8.12277 27.4554 15C27.4554 21.8772 21.8772 27.4554 15 27.4554Z" fill="black" fillOpacity="0.65" />
                        <path d="M20.8496 19.2362L16.075 15.7842V7.49735C16.075 7.35003 15.9545 7.22949 15.8072 7.22949H14.1967C14.0494 7.22949 13.9288 7.35003 13.9288 7.49735V16.7183C13.9288 16.8054 13.969 16.8857 14.0393 16.936L19.5773 20.9739C19.6978 21.061 19.8652 21.0342 19.9523 20.917L20.9099 19.6112C20.9969 19.4873 20.9701 19.3199 20.8496 19.2362Z" fill="black" fillOpacity="0.65" />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect width="30" height="30" fill="white" />
                        </clipPath>
                    </defs>
                </svg>

                <div style={{ width: '150px' }}>
                    <h1 className={styles.timeLeft}>Time left: <span>{timeLeft}</span></h1>
                    <p>{startTime && startTime.substr(0, 5)} - {endTime && endTime.substr(0, 5)}</p>
                </div>
            </div>
        </div>
    );
};

export { Top };
