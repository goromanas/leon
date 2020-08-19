import React from 'react'
import { Button } from 'antd';
import { TeamOutlined, MessageOutlined } from "@ant-design/icons";
import {Wand} from "../wand"

import styles from './video-buttons.module.scss'

interface Props {
    role: string[];
}

const VideoButton: React.FC<Props> = ({role}) =>(
    <div style={{marginTop: '20px', marginLeft: '5px'}}>
        <div className={styles.videobtn} style={{cursor: 'pointer'}}><Button type='primary' style={{borderRadius: '100%', height: '50px', fontSize: '20px'}}><TeamOutlined /></Button> Participants</div>
        {
            (role[0] === "STUDENT") ? console.log('student') :
            (
                <>
                    <div className={styles.videobtn}><Button type='primary'  style={{borderRadius: '100%', height: '50px', fontSize: '20px'}}><MessageOutlined /></Button>Create a Question</div>
                    <div className={styles.videobtn}><Button type='primary'  style={{borderRadius: '100%', height: '50px'}}><span style={{ width: '20px', display:'flex' }}><Wand /></span></Button> Whiteboard</div>
                </>
            )
        }
    </div>
)

export { VideoButton }
