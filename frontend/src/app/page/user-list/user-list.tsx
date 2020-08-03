import React from 'react';
import { Button, Layout, message, Table } from 'antd';
// tslint:disable-next-line:no-submodule-imports
import { ColumnsType } from 'antd/lib/table/interface';

import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
import { userService } from 'app/api/service/user-service';

import styles from './user-list.module.scss';

const { Content } = Layout;

interface OwnProps {
}

type Props = OwnProps;

interface State {
    users: Api.UserDto[];
}

class UserList extends React.Component<Props, State> {

    private static readonly COLUMNS: ColumnsType<Api.UserDto> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Surname',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Roles',
            dataIndex: 'role',
            key: 'role',
            render: roles => roles.join(', '),
        },
    ];

    public readonly state: State = {
        users: [],
    };

    public componentDidMount(): void {
        userService.getUsers()
            .then(users => this.setState({ users }))
            .catch(() => message.error('Failure getting users list'));
    }

    public render(): React.ReactNode {
        const {
            users,
        } = this.state;

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <h1>User list</h1>
                        <Table
                            dataSource={users}
                            columns={UserList.COLUMNS}
                            rowKey="id"
                            onRow={user => ({
                                onClick: () => this.handleClickUser(user),
                            })}
                        />
                        <Button
                            className={styles.newUserButton}
                            type="primary"
                            onClick={this.handleClickCreateNewUser}
                        >
                            Create new user
                        </Button>
                        <Button
                            onClick={this.handleClickBack}
                        >
                            Back
                        </Button>
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleClickCreateNewUser = (): void => {
        navigationService.redirectToUserDetailsPage();
    };

    private readonly handleClickBack = (): void => {
        navigationService.redirectToDefaultPage();
    };

    private readonly handleClickUser = (user: Api.UserDto): void => {
        navigationService.redirectToUserDetailsPage(user.id);
    };

}

export { UserList };
