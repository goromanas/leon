import React, { useState } from 'react';

import { MessageOutlined, TeamOutlined, DownOutlined, LeftOutlined } from '@ant-design/icons';

import { Wand } from 'app/page/video-chat/wand';
import { ActiveUsers } from 'app/page/video-chat/activeUsers';

import { Button, Menu } from 'antd';
import styles from 'app/page/video-chat/video-chat-page.module.scss';
import { QuizResult } from '../quiz/quizResult';
import { BonusPoints } from 'app/page/video-chat/bonus-points/bonus-points';

interface QuizAnswer {
    studentName: string;
    answer: number;
}

const { SubMenu } = Menu;

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
    testSubmitted: boolean;
    timer: number;
    whiteboardVisible: boolean;
}

const VideoButton: React.FC<Props> = (props) => {
    const [showBonusPoints, setBonusPoints] = useState(true);

    const handleBonusPoints = (): void => {
        setBonusPoints(!showBonusPoints);
    };
    const [showUsers, setShowUsers] = useState(false);
    const handleActiveUsers = (): void => {
        setShowUsers(!showUsers);
    };
    // const handleClickWhiteboard = () => {
    //     showUsers && setShowUsers(false);
    //     props.handleWhiteboard();
    // };
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
                        backgroundColor: showUsers ? '#5A8AEA' : '#5B97FC',
                    }}>
                    <TeamOutlined style={{ transform: 'scale(1.5)' }} />
                </Button>
                <h1> Participants <span>({props.activeUsers}/{props.allUsers})</span></h1>
            </div>
            <ActiveUsers activeUsers={props.users} isOpen={showUsers} />

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
                                        boxShadow: showUsers ? '6px 6px 17px -3px rgba(0,0,0,0.26)' : '',
                                        backgroundColor: showUsers ? '#5A8AEA' : '#5B97FC',
                                    }}>
                                    <TeamOutlined style={{ transform: 'scale(1.5)' }} />
                                </Button>
                                Send Bonus Points
                            </div>

                            {showBonusPoints ? null : (
                                <BonusPoints
                                    onClose={handleBonusPoints}
                                    users={props.users}
                                    ws={props.ws}
                                    show={showBonusPoints}
                                />
                            )}
                            <div className={styles.videobtn}>
                                <Button
                                    type="primary"
                                    onClick={props.openQuiz}
                                    style={{
                                        borderRadius: '100%',
                                        height: '50px',
                                        fontSize: '20px',
                                        boxShadow: props.replyVisible ? '6px 6px 17px -3px rgba(0,0,0,0.26)' : '',
                                        backgroundColor: showUsers ? '#5A8AEA' : '#5B97FC',
                                    }
                                    }
                                >
                                    <MessageOutlined style={{ transform: 'scale(1.5)' }} />
                                </Button>Create a Question

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
                                        borderRadius: '25px',
                                        height: '50px',
                                    }}>
                                    <span
                                        style={{ width: '20px', display: 'flex' }}><Wand />
                                    </span>
                                </Button>
                                Whiteboard
                                {props.whiteboardVisible === true ? (<Button
                                    shape="circle"
                                    icon={<LeftOutlined />}
                                    onClick={props.handleWhiteboard}
                                />) : ''}

                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export { VideoButton };
