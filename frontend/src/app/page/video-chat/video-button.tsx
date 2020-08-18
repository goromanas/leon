import React from 'react'
import { Button } from 'antd';
import { TeamOutlined, MessageOutlined } from "@ant-design/icons";
import {Wand} from "./wand"

const VideoButton: React.FC = () =>(
    <div>
        <div><Button type='primary'><TeamOutlined />Participants</Button></div>
        <Button type='primary'><TeamOutlined />Participants</Button>
        <Button type='primary'><MessageOutlined /> Question Form</Button>
        <Button type='primary'><span><Wand /></span> Whiteboard</Button>
    </div>
)

// const Btn: React.FC = () => (
//     <div><TeamOutlined /> Participants</div>
// )

export { VideoButton }
