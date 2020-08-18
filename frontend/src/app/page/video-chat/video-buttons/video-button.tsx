import React from 'react'
import { Button } from 'antd';
import { TeamOutlined, MessageOutlined } from "@ant-design/icons";
import {Wand} from "../wand"

import styles from './video-buttons.module.scss'

const VideoButton: React.FC = () =>(
    <div>
        <div className={styles.videobtn} ><Button type='primary' style={{borderRadius: '100%', height: '45px'}}><TeamOutlined /></Button> Participants</div>
        <div className={styles.videobtn}><Button type='primary'  style={{borderRadius: '100%', height: '45px'}}><MessageOutlined /></Button> Question Form</div>
        <div className={styles.videobtn}><Button type='primary'  style={{borderRadius: '100%', height: '45px'}}><span style={{ width: '15px', display:'flex' }}><Wand /></span></Button> Whiteboard</div>
    </div>
)

export { VideoButton }
