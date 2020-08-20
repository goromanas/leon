import React from 'react';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';

interface Props {
    channels: Api.Subject[];
    currentChannel: number;
    onChannelChange: any;
    onClassChange: any;
    classRooms: Api.ClassroomDto[];
}

class Channels extends React.Component<Props> {
    public render(): React.ReactNode {
        const { channels, currentChannel, onChannelChange, classRooms } = this.props;

        return (
      <Menu
        defaultSelectedKeys={[currentChannel.toString()]}
        defaultOpenKeys={['sub1']}
        mode="inline"

      >
        <Menu.Item style={{fontSize: '20px', marginTop: '27px'}}>Subjects</Menu.Item>

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
              </Menu.Item>
            ))}
        {/*</SubMenu>*/}
      </Menu>
        );
    }
}

export { Channels };
