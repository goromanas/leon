import React from 'react';
import { Col, Layout, message, Row } from 'antd';
import { FormikHelpers } from 'formik';
// tslint:disable-next-line:no-submodule-imports
import { FormikState } from 'formik/dist/types';

import { PageContent } from 'app/components/layout';
import { connectContext, SettingsProps } from 'app/context';
import { navigationService } from 'app/service/navigation-service';
import { sessionService } from 'app/api/service/session-service';
import { loggerService } from 'app/service/logger-service';

import { LoginErrors, LoginForm, LoginValues } from './form/login-form';

import styles from './login-page.module.scss';

const { Content } = Layout;

interface ContextProps {
    authenticated: boolean;
}

interface OwnProps {
}

type Props = OwnProps & ContextProps;

class LoginPageComponent extends React.Component<Props, {}> {

    private static LOGIN_INITIAL_VALUES: LoginValues = { username: '', password: '', checkbox: false };

    public checkStorage(): void {
        LoginPageComponent.LOGIN_INITIAL_VALUES.checkbox = false;
        console.log('hello');
        if (localStorage.checkbox && localStorage.username != null) {
            LoginPageComponent.LOGIN_INITIAL_VALUES.checkbox = localStorage.checkbox;
            LoginPageComponent.LOGIN_INITIAL_VALUES.username = localStorage.username;
            LoginPageComponent.LOGIN_INITIAL_VALUES.password = localStorage.password;
        }
    }

    private static readonly validate = (values: LoginValues): LoginErrors => {
        const errors: LoginErrors = {};

        if (!values.username) {
            errors.username = 'Username is required';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    public render(): React.ReactNode {
        this.checkStorage();
        const {
            authenticated,
        } = this.props;

        if (authenticated) {
            navigationService.redirectToDefaultPage();
            return;
        }

        return (
            <Layout>
                <Content>
                    <PageContent>
                        <Row className={styles.loginContainer}>
                            <Col xl={10} lg={8} md={7} sm={6} xs={0} />
                            <Col xl={4} lg={8} md={10} sm={12} xs={24}>
                                <LoginForm
                                    initialValues={LoginPageComponent.LOGIN_INITIAL_VALUES}
                                    onSubmit={this.handleSubmit}
                                    validate={LoginPageComponent.validate}
                                />
                            </Col>
                            <Col xl={10} lg={8} md={7} sm={6} xs={0} />
                        </Row>
                    </PageContent>
                </Content>
            </Layout>
        );
    }

    private readonly handleSubmit = (values: LoginValues, { resetForm }: FormikHelpers<LoginValues>): void => {
        console.log(values.checkbox);
        if (values.checkbox && values.username !== '') {
            localStorage.username = values.username;
            localStorage.checkbox = values.checkbox;
            localStorage.password = values.password;
        }else
            {
                localStorage.clear();
            }
        sessionService.login(values.username, values.password)
            .then(() => {

                navigationService.redirectToDefaultPage(); })
            .catch(error => this.handleError(error, resetForm, values));
    };

    private readonly handleError = (
        error: any,
        resetForm: (nextValues?: Partial<FormikState<LoginValues>>) => void,
        values: LoginValues,
    ): void => {
        values.password = LoginPageComponent.LOGIN_INITIAL_VALUES.password;
        resetForm({ values });

        const errorMessage: string = error.status === 403
            ? 'Neteisingas prisijungimo vardas arba slaptažodis'
            : error.data.message;

        message.error(errorMessage, 20);

        loggerService.error(errorMessage, error);
    };

}

const mapContextToProps = ({ session: { authenticated } }: SettingsProps): ContextProps => ({
    authenticated,
});

const LoginPage = connectContext(mapContextToProps)(LoginPageComponent);

export { LoginPage };
