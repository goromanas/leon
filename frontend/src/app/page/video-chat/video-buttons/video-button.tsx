import React, { useState } from 'react';

import { MessageOutlined, TeamOutlined } from '@ant-design/icons';

import { Wand } from 'app/page/video-chat/wand';
import { ActiveUsers } from 'app/page/video-chat/activeUsers';

import { Button, Menu } from 'antd';

import { BonusPoints } from 'app/page/video-chat/bonus-points/bonus-points';
import styles from 'app/page/video-chat/video-chat-page.module.scss';
import { QuizResult } from '../quiz/quizResult';

interface QuizAnswer {
    studentName: string;
    answer: number;
}

const {SubMenu} = Menu;

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
        <div className={styles.allButtons}>
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
                    <TeamOutlined style={{transform: 'scale(1.5)'}}/>
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
                                <div onClick={props.handleWhiteboard} className={styles.videobtn}><Button type='primary'
                                                                                                          style={{
                                                                                                              borderRadius: '100%',
                                                                                                              height: '50px'
                                                                                                          }}><span
                                    style={{width: '20px', display: 'flex'}}><Wand/></span></Button>
                                    Whiteboard
                                </div>
                                <Menu style={{width: '100%'}}
                                      defaultSelectedKeys={['1']}
                                      defaultOpenKeys={['sub1']}
                                      mode="inline"
                                      className={styles.bonusPointMenu}>


                                    <SubMenu
                                        className={styles.antMenuSubmenuTitleCustom}
                                        style={{width: '100% !important', height: '50px'}}
                                        key="sub4"
                                        title={<div><Button type='primary'
                                                            style={{borderRadius: '100%', height: '50px'}}><span
                                            style={{width: '20px', display: 'flex'}}><Wand/></span></Button>Bonus Points
                                        </div>}>
                                        <Menu.Item style={{height: '500px', padding: '0!important'}}>
                                            <BonusPoints/>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </div>
                        )
            }
        </div>
    );
};

export { VideoButton };
