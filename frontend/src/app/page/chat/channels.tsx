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
    channelsWithNewMessages: number[]
}
type Props = OwnProps & ContextProps

class ChannelsC extends React.Component<Props> {
    public render(): React.ReactNode {
        const { channels, currentChannel, onChannelChange, classRooms, role, channelsWithNewMessages } = this.props;
        console.log(channelsWithNewMessages)
        // console.log(classRooms)
        // console.log(currentChannel)
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
                  {channelsWithNewMessages.includes(classroom.id) ? <Badge dot={this.props.channelsWithNewMessages.length !==0}></Badge> : null}
              </Menu.Item>
            ))}
        {/*</SubMenu>*/}
      </Menu>
        );
    }
}

const mapContextToProps = ( { channelsWithNewMessages }: SettingsProps): ContextProps => ({
    channelsWithNewMessages
});

const Channels = connectContext(mapContextToProps)(ChannelsC)

export { Channels };
