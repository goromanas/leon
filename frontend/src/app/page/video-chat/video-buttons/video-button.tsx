import React, { useState } from 'react';

import {
    DownOutlined,
    FormOutlined,
    GiftOutlined,
    LeftOutlined,
    MessageOutlined,
    RadiusBottomrightOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { ActiveUsers } from 'app/page/video-chat/activeUsers';

import { Button, notification } from 'antd';
import styles from 'app/page/video-chat/video-chat-page.module.scss';
import { QuizResult } from '../quiz/quizResult';
import { BonusPoints } from 'app/page/video-chat/bonus-points/bonus-points';

interface QuizAnswer {
    studentName: string;
    answer: number;
}

interface Props {
    role: string[];
    send: any;
    handleWhiteboard: any;
    openQuiz: any;
    activeUsers: number;
    allUsers: number;
    users: any;
    activeUsersState: boolean;
    answers: QuizAnswer[];
    correct: number;
    question: string;
    replyVisible: boolean;
    ws: any;
    showResults: any;
    onAcknowledgement: boolean;
    acknowledgementData: any;
    testSubmitted: boolean;
    timer: number;
    whiteboardVisible: boolean;
}

const VideoButton: React.FC<Props> = (props) => {
    const [showBonusPoints, setBonusPoints] = useState(true);

    const handleBonusPoints = (): void => {
        setBonusPoints(!showBonusPoints);
        // console.log(showBonusPoints);
    };
    const [showUsers, setShowUsers] = useState(false);
    const [notifications, setNotification] = useState(true);
    const handleActiveUsers = (): void => {
        setShowUsers(!showUsers);
    };
    // console.log(props.acknowledgementData);
    if (props.onAcknowledgement && notifications && props.acknowledgementData.points) {
        const placement = 'bottomRight';
        notification.success({
            message: `Congrats!`,
            description: `Teacher has sent you
                        +${props.acknowledgementData.points} for your participation!`,
            placement,
            style: { borderRadius: '31px' },
            duration: 15,
            icon: <img style={{ width: '50px', marginTop: '15px', marginLeft: '-15px' }}
                src={'/icons/side-menu/superhero.png'} />,
        });
        setNotification(false);
    }

    return (

        <div className={styles.allButtons}>

            <div key={props.activeUsers} className={styles.videobtn} onClick={() => handleActiveUsers()}>
                <Button
                    type="primary"
                    style={{
                        borderRadius: '100%',
                        height: '50px',
                        fontSize: '20px',
                        boxShadow: showUsers ? '6px 6px 17px -3px rgba(0,0,0,0.26)' : '',
                        // backgroundColor: showUsers ? '#5A8AEA' : '#5B97FC',
                    }}>
                    <TeamOutlined style={{ transform: 'scale(1.5)' }} />
                </Button>
                <span className={styles.buttonTitle}>Students <span>({props.activeUsers}/{props.allUsers})</span></span>
            </div>
            <ActiveUsers activeUsers={props.users} isOpen={showUsers} />
            {props.onAcknowledgement ?
                <RadiusBottomrightOutlined />
                : null}
            {
                (props.role[0] === 'STUDENT') ? null :

                    (

                        <div>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleBonusPoints()}>
                                <Button
                                    type="primary"
                                    style={{
                                        borderRadius: '100%',
                                        height: '50px',
                                        fontSize: '20px',
                                        boxShadow: !showBonusPoints ? '6px 6px 17px -3px rgba(0,0,0,0.26)' : '',
                                        // backgroundColor: !showBonusPoints ? '#5A8AEA' : '#5B97FC',
                                    }}>
                                    <GiftOutlined style={{ transform: 'scale(1.5)' }} />
                                </Button>
                                <span className={styles.buttonTitle}>Send Bonus Points</span>

                            </div>

                            {/* {showBonusPoints ? null : ( */}
                            <BonusPoints
                                onClose={handleBonusPoints}
                                users={props.users}
                                ws={props.ws}
                                show={showBonusPoints}
                            />
                            {/* )} */}
                            <div className={styles.videobtn}>
                                <Button
                                    type="primary"
                                    onClick={props.openQuiz}
                                    style={{
                                        borderRadius: '100%',
                                        height: '50px',
                                        fontSize: '20px',
                                    }}
                                >
                                    <MessageOutlined style={{ transform: 'scale(1.5)' }} />
                                </Button><span onClick={props.openQuiz}
                                    className={styles.buttonTitle}>Create a Question</span>
                                {props.testSubmitted === true ? (
                                    <Button
                                        shape="circle"
                                        icon={<DownOutlined />}
                                        className={props.replyVisible === true ? styles.openbutton : styles.closebutton}
                                        onClick={props.showResults}
                                    />
                                ) : ''}
                            </div>
                            <QuizResult
                                answers={props.answers}
                                correct={props.correct}
                                question={props.question}
                                isOpen={props.replyVisible}
                                showResults={props.showResults}
                                allUsers={props.activeUsers}
                                testSubmitted={props.testSubmitted}
                                timer={props.timer}
                            />
                            <div onClick={props.handleWhiteboard} className={styles.videobtn}>

                                <Button
                                    type="primary"
                                    style={{
                                        borderRadius: '100%',
                                        height: '50px',
                                        fontSize: '20px',

                                    }}>
                                    <FormOutlined style={{ transform: 'scale(1.5)' }} />
                                </Button>
                                <span className={styles.buttonTitle}>Whiteboard</span>
                                {props.whiteboardVisible === true ? (<Button
                                    shape="circle"
                                    icon={<LeftOutlined />}
                                    onClick={props.handleWhiteboard} />) : ''}
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export { VideoButton };

