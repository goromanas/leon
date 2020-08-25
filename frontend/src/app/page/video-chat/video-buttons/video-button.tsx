import React from 'react';
import { Button, Menu } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { Wand } from '../wand';
import styles from './video-buttons.module.scss';
import { BonusPoints } from 'app/page/video-chat/bonus-points/bonus-points';

const {SubMenu} = Menu;

interface Props {
    role: string[];
    send: any;
    handleWhiteboard: any;
    handleBonusPointsTab: any;
    openQuiz: any;
    activeUsers: number;
    allUsers: number;
    handleActiveUsers: any;
}

const VideoButton: React.FC<Props> = (props) => (
    <div style={{marginTop: '20px', marginLeft: '5px'}}>
        {/* <div className={styles.videobtn} style={{cursor: 'pointer'}}><Button type='primary' style={{
            borderRadius: '100%',
            height: '50px',
            fontSize: '20px'
        }}><TeamOutlined/></Button> Participants
        </div> */}
        {
            <>
                <div key={props.activeUsers} className={styles.videobtn}><Button onClick={props.handleActiveUsers} type='primary' style={{
                    borderRadius: '100%',
                    height: '50px',
                    fontSize: '20px'
                }}><MessageOutlined/>
                </Button>Participants {props.activeUsers} / {props.allUsers}
                </div>

                {(props.role[0] === 'STUDENT') ? null :

                    (<div>
                            <div onClick={props.openQuiz} className={styles.videobtn}><Button type='primary' style={{
                                borderRadius: '100%',
                                height: '50px',
                                fontSize: '20px'
                            }}><MessageOutlined/></Button>Create a Question
                            </div>

                            <div onClick={props.handleWhiteboard} className={styles.videobtn}>
                                <Button type='primary' style={{borderRadius: '100%', height: '50px'}}><span
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
                                    title={<div><Button type='primary' style={{borderRadius: '100%', height: '50px'}}><span
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
            </>
        }
    </div>
);

export { VideoButton };
