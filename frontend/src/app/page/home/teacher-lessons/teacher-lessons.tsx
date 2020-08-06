import React from 'react';
import { Button, Layout, message, Table } from 'antd';
// tslint:disable-next-line:no-submodule-imports
import { ColumnsType } from 'antd/lib/table/interface';

import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
import { lessonsService } from 'app/api/service/lessons-service';

import styles from './user-list.module.scss';

const { Content } = Layout;

interface OwnProps {
}

type Props = OwnProps;

interface State {
    lessons: Api.Lesson[];
}

class TeacherLessons extends React.Component<Props, State> {

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
    ];

    public readonly state: State = {
        lessons: [],
    };

    public render(): React.ReactNode {
        const {
            lessons,
        } = this.state;

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <h1>User list</h1>
                        <Table
                            dataSource={lessons}
                            rowKey="id"
                        />
                    </PageContent>
                </Content>
            </Layout>
        );
    }

}

export { TeacherLessons };
