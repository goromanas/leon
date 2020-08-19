import React from 'react'
import { Button } from 'antd';
import { TeamOutlined, MessageOutlined } from "@ant-design/icons";
import {Wand} from "../wand"

import styles from './video-buttons.module.scss'

interface Props {
    role: string[];
}

const VideoButton: React.FC<Props> = ({role}) =>(
    <div>
        <div className={styles.videobtn} style={{cursor: 'pointer'}}><Button type='primary' style={{borderRadius: '100%', height: '45px'}}><TeamOutlined /></Button> Participants</div>
        {
            (role[0] === "STUDENT") ? console.log('student') :
            (
                <>
                    <div className={styles.videobtn}><Button type='primary'  style={{borderRadius: '100%', height: '45px'}}><MessageOutlined /></Button> Question Form</div>
                    <div className={styles.videobtn}><Button type='primary'  style={{borderRadius: '100%', height: '45px'}}><span style={{ width: '15px', display:'flex' }}><Wand /></span></Button> Whiteboard</div>
                </>
            )
        }
    </div>
)

export { VideoButton }
