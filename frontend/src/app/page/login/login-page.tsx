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
import { Logo } from 'app/components/logo/logo';

import { LoginErrors, LoginForm, LoginValues } from './form/login-form';

import styles from './login-page.module.scss';

const { Content } = Layout;

interface ContextProps {
    authenticated: boolean;
}

interface OwnProps {}

message.config({
    duration: 2,
    maxCount: 1,
    getContainer: () => document.body,
});

type Props = OwnProps & ContextProps;

class LoginPageComponent extends React.Component<Props, {}> {
    private static readonly LOGIN_INITIAL_VALUES: LoginValues = { username: '', password: '', checkbox: false };

    private static readonly validate = (values: LoginValues): LoginErrors => {
        const errors: LoginErrors = {};

        if (!values.username) {
            errors.username = 'You need to enter a usename';
        }
        if (!values.password) {
            errors.password = 'You need to enter a password';
        }

        return errors;
    };

    public render(): React.ReactNode {
        const { authenticated } = this.props;

        if (authenticated) {
            navigationService.redirectToDefaultPage();
            return;
        }

        return (
      <Layout className={styles.loginLayout}>
        <Content>
          <PageContent>
            <Row className={styles.loginContainer}>
              <div className={styles.loginHeading}>
                <Logo fontSize={'2.5rem'} />
                <span className={styles.loginSubheading}>Learning Online</span>
              </div>
              <div className={styles.loginMessagewrapper} />
              <LoginForm
                initialValues={LoginPageComponent.LOGIN_INITIAL_VALUES}
                onSubmit={this.handleSubmit}
                validate={LoginPageComponent.validate}
              />
            </Row>
            <img alt="Login User" src={'images/login-user.svg'} className={styles.loginImage} />
          </PageContent>
        </Content>
      </Layout>
        );
    }

    private readonly handleSubmit = (values: LoginValues, { resetForm }: FormikHelpers<LoginValues>): void => {
        sessionService
      .login(values.username, values.password, values.checkbox)
      .then(() => {
          navigationService.redirectToDefaultPageAfterLogin();
      })
      .catch(error => this.handleError(error, resetForm, values));
    };

    private readonly handleError = (error: any, resetForm: (nextValues?: Partial<FormikState<LoginValues>>) => void, values: LoginValues): void => {
        values.password = LoginPageComponent.LOGIN_INITIAL_VALUES.password;
        resetForm({ values });

        const errorMessage: string = error.status === 403 ? 'Incorrect username or password' : error.data.message;

        message.error(errorMessage, 3);

        loggerService.error(errorMessage, error);
    };
}

const mapContextToProps = ({ session: { authenticated } }: SettingsProps): ContextProps => ({
    authenticated,
});

const LoginPage = connectContext(mapContextToProps)(LoginPageComponent);

export { LoginPage };
