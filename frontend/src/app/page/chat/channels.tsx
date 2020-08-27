import React from 'react';
import { Menu, Badge } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { connectContext, SettingsProps } from 'app/context';

interface OwnProps {
    channels: Api.Subject[];
    currentChannel: number;
    onChannelChange: any;
    onClassChange: any;
    classRooms: Api.ClassroomDto[];
    role: string
}

interface ContextProps {
    channelsWithNewMessages: number[],
    channelsWithNewMessagesT: string[],
    removeChannelArray: (id: number) => void;
}
type Props = OwnProps & ContextProps

class ChannelsC extends React.Component<Props> {

    componentDidUpdate(){
        const { channels, currentChannel, onChannelChange, classRooms, role, channelsWithNewMessages,channelsWithNewMessagesT, removeChannelArray } = this.props;

        if (channelsWithNewMessages.includes(currentChannel)) {
            removeChannelArray(currentChannel);
        }
    }

    public render(): React.ReactNode {
        const { channels, currentChannel, onChannelChange, classRooms, role, channelsWithNewMessages,channelsWithNewMessagesT, removeChannelArray } = this.props;
console.log(this.props.channelsWithNewMessagesT)
        return (
      <Menu
          selectedKeys={[currentChannel.toString()]}
          mode="inline"
      >
        <Menu.Item style={{ fontSize: '20px', marginTop: '27px' }}>{role === 'STUDENT'? 'Subjects': 'Classes'}</Menu.Item>

          {this.props.channels &&
            this.props.channels
            .sort((a, b) => (a.name > b.name) ? 1 : -1)
            .map(channel => (
              <Menu.Item
                  onClick={() => this.props.onChannelChange(channel.id)}
                  key={channel.id}
                  style={{ marginLeft: '20px' }}
              >
                {channel.name}
                  {channelsWithNewMessages.includes(channel.id) ? <Badge dot={this.props.channelsWithNewMessages.length !==0}></Badge> : null}
              </Menu.Item>
            ))}
            {this.props.classRooms &&
            this.props.classRooms
            .sort((a, b) => (a.classroomName > b.classroomName) ? 1 : -1)
            .map(classroom => (
              <Menu.Item
                onClick={() => this.props.onClassChange(classroom.classroomName)}
                key={classroom.classroomName}
                style={{ marginLeft: '20px', width: '200px' }}
              >
                {classroom.classroomName}
                  {channelsWithNewMessagesT.includes(classroom.classroomName) ? <Badge dot={this.props.channelsWithNewMessages.length !==0}></Badge> : null}
              </Menu.Item>
            ))}
        {/*</SubMenu>*/}
      </Menu>
        );
    }
}

const mapContextToProps = ( { channelsWithNewMessages, channelsWithNewMessagesT, actions: {removeChannelArray} }: SettingsProps): ContextProps => ({
    channelsWithNewMessages,
    channelsWithNewMessagesT,
    removeChannelArray,
});

const Channels = connectContext(mapContextToProps)(ChannelsC)

export { Channels };
