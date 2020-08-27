import React from 'react';
import { Field, Form, Formik, FormikConfig } from 'formik';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { InputField, PasswordInputField, CheckBoxField } from 'app/components/inputs';
import { FormButton, SubmitButton } from 'app/components/buttons';
import { FormErrors } from 'app/model/form-errors';

import { InputIcon } from './input-icon';

import styles from './login-form.module.scss';

export interface LoginValues {
    username: string;
    password: string;
    checkbox: boolean;
}

export type LoginErrors = FormErrors<LoginValues>;

type Props = FormikConfig<LoginValues>;

const LoginForm: React.FC<Props> = (props: Props) => {
    const { initialValues, onSubmit, validate } = props;

    return (
        <div className={styles.loginFormwrapper}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                {() => (
                    <Form>
                        <label>Username</label>
                        <Field
                            component={InputField}
                            name="username"
                            placeholder="Username"
                        />
                        <label>Password</label>
                        <Field
                            component={PasswordInputField}
                            name="password"
                            placeholder="*********"
                        />
                        <div className={styles.loginFormrememberme}>
                            <Field type="checkbox" name="checkbox" />
                            <label className={styles.loginFormlabel}>Remember me</label>
                        </div>
                        <FormButton
                            component={SubmitButton}
                        >
                            Sign In
          </FormButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export { LoginForm };
