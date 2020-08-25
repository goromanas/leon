import React from 'react';
import { Button } from 'antd';
import { LeftOutlined, TeamOutlined } from '@ant-design/icons';

interface Props {
    activeUsers: any;
    handleActiveUsers: any;
}

const ActiveUsers: React.FC<Props> = (props) => (
    <div style={{ marginTop: '20px', marginLeft: '5px' }}>
        {
            (
                <>

                    <div key={props.activeUsers}>
                        <Button
                            onClick={props.handleActiveUsers}
                            style={{
                                height: '50px',
                                fontSize: '20px',
                                borderStyle: 'none',
                            }}
                        >
                            <LeftOutlined
                            />
                            <TeamOutlined
                            />
                            {props.activeUsers.filter((au: any) => au.active === true).length} students joined
                        </Button>
                        <div style={{ color: 'red' }}>
{props.activeUsers.length - props.activeUsers.filter((au: any) => au.active === true).length} missing
                        </div>
                    </div>
                    <ol>
                        {
                            props.activeUsers.map((item: any) =>
                                (
                                    <li key={item.index}>
                                        <h3 style={{ color: item.active ? 'green' : 'red' }}>
                                            {item.firstName + ' ' + item.lastName}
                                        </h3>
                                    </li>
                                ),
                            )
                        }
                    </ol>
                </>
            )
        }
    </div>
);

export { ActiveUsers };
