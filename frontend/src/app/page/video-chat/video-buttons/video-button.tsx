import React, { useState } from 'react';
import { Button } from 'antd';
import { MessageOutlined, TeamOutlined } from '@ant-design/icons';

import { Wand } from 'app/page/video-chat/wand';
import { ActiveUsers } from 'app/page/video-chat/activeUsers';
import styles from 'app/page/video-chat/video-chat-page.module.scss';
import { QuizResult } from '../quiz/quizResult';

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
}

const VideoButton: React.FC<Props> = (props) => {

    const [showUsers, setShowUsers] = useState(false);
    const handleActiveUsers = () => {
        setShowUsers(!showUsers);
        // console.log(showUsers);
    };
    const handleClickWhiteboard = () => {
        showUsers && setShowUsers(false);
        props.handleWhiteboard();
    };

    return (
        <div className={styles.allButtons} >

            <div
                key={props.activeUsers}
                className={styles.videobtn}
                onClick={() => handleActiveUsers()}
            >
                <Button
                    type="primary"
                    style={{
                        borderRadius: '100%',
                        height: '50px',
                        fontSize: '20px',
                        boxShadow: showUsers ? '6px 6px 17px -3px rgba(0,0,0,0.26)' : '',
                        backgroundColor: showUsers ? '#5A8AEA' : '#5B97FC',
                    }}
                >
                    <TeamOutlined style={{ transform: 'scale(1.5)' }} />
                </Button>
                <h1> Participants <span>({props.activeUsers}/{props.allUsers})</span></h1>
            </div>
            {/* {showUsers &&
                ( */}
            <ActiveUsers
                activeUsers={props.users}
                isOpen={showUsers}
            />
            {/* )
            } */}
            {
                (props.role[0] === 'STUDENT') ? null :

                    (
                        <div>
                            <div onClick={props.openQuiz} className={styles.videobtn}>
                                <Button
                                    type="primary"
                                    style={{
                                        borderRadius: '100%',
                                        height: '50px',
                                        fontSize: '20px',
                                    }}
                                >
                                    <MessageOutlined style={{ transform: 'scale(1.5)' }} />
                                </Button>Create a Question
                        </div>
                            <QuizResult
                                answers={props.answers}
                                correct={props.correct}
                                question={props.question}
                                isOpen={props.replyVisible}
                            />
                            <div onClick={() => handleClickWhiteboard()} className={styles.videobtn}>
                                <Button
                                    type="primary"
                                    style={{
                                        borderRadius: '100%',
                                        height: '50px',
                                    }}
                                >
                                    <span
                                        style={{ width: '20px', display: 'flex' }}
                                    >
                                        <div style={{ transform: 'scale(1.5)' }}> <Wand /></div>
                                    </span>
                                </Button>
                                Whiteboard
                            </div>
                        </div>
                    )
            }
        </div >
    );
};

export { VideoButton };
