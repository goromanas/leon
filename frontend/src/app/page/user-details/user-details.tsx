import React from 'react';
import { Layout, message } from 'antd';
import { RouteComponentProps } from 'react-router';
import _ from 'lodash';

import { navigationService } from 'app/service/navigation-service';
import { PageContent } from 'app/components/layout';
import { userService } from 'app/api/service/user-service';
import { UserDetailsErrors, UserDetailsForm } from 'app/page/user-details/form/user-details-form';

const { Content } = Layout;

interface Params {
    id: string;
}

type Props = RouteComponentProps<Params>;

interface State {
    user: Api.UserDto;
}

class UserDetails extends React.Component<Props, State> {
    private static readonly EMPTY_USER: Api.UserDto = {
        email: '',
        firstName: '',
        lastName: '',
        role: [],
        username: '',
    };

    private static readonly validate = (values: Api.UserDto): UserDetailsErrors => {
        const errors: UserDetailsErrors = {};

        if (!values.firstName) {
            errors.firstName = 'Name is required';
        }
        if (!values.lastName) {
            errors.lastName = 'Surname is required';
        }
        if (!values.username) {
            errors.username = 'Username is required';
        }
        if (values.role.length < 1) {
            errors.role = 'User must have at least one role';
        }

        return errors;
    };

    public readonly state: State = {
        user: null,
    };

    public componentDidMount(): void {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        if (!_.isNil(id)) {
            userService
                .getUser(parseInt(id, 10))
                .then((user) => this.setState({ user }))
                .catch(() => message.error('Failure getting user details'));
        } else {
            this.setState({ user: UserDetails.EMPTY_USER });
        }
    }

    public render(): React.ReactNode {
        const { user } = this.state;

        return (
            <Layout>
                <Content>
                    <PageContent>
                        {user && (
                            <UserDetailsForm
                                initialValues={user}
                                validate={UserDetails.validate}
                                onSubmit={this.handleSubmit}
                                onCancel={this.handleCancel}
                            />
                        )}
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleSubmit = (_user: Api.UserDto): void => {
        const { user } = this.state;

        _.isNil(user.id) ? this.createUser(_user) : this.saveUser(_user);
    };

    private readonly saveUser = (user: Api.UserDto): void => {
        userService
            .updateUser(user)
            .then(() => navigationService.redirectToUserListPage())
            .catch(() => message.error('Failure saving user'));
    };

    private readonly createUser = (user: Api.UserDto): void => {
        userService
            .createUser(user)
            .then(() => navigationService.redirectToUserListPage())
            .catch(() => message.error('Failure creating user'));
    };

    private readonly handleCancel = (): void => {
        navigationService.redirectToUserListPage();
    };
}

export { UserDetails };
