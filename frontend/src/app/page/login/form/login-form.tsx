import React from 'react';
import { Field, Form, Formik, FormikConfig } from 'formik';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { InputField, PasswordInputField, CheckBoxField } from 'app/components/inputs';
import { FormButton, SubmitButton } from 'app/components/buttons';
import { FormErrors } from 'app/model/form-errors';

import { InputIcon } from './input-icon';

export interface LoginValues {
    username: string;
    password: string;
    checkbox: boolean;
}

export type LoginErrors = FormErrors<LoginValues>;

type Props = FormikConfig<LoginValues>;

const LoginForm: React.FC<Props> = (props: Props) => {
    const {
        initialValues,
        onSubmit,
        validate,
    } = props;

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
        >
            {() => (
                <Form>
                    <label>Vartotojo vardas</label>
                    <Field
                        component={InputField}
                        name="username"
                        placeholder="Username"
                        prefix={<InputIcon component={UserOutlined} />}
                    />
                    <label>Slaptažodis</label>
                    <Field
                        component={PasswordInputField}
                        name="password"
                        placeholder="Password"
                        prefix={<InputIcon component={LockOutlined} />}
                    />
                    <div className="checkbox-wrapper">
                    <Field
                        component={CheckBoxField}
                        type="checkbox"
                        name="rememberme"
                        prefix={<InputIcon component={LockOutlined} />}
                    />
                    </div>
                    <label>prisiminti mane</label>
                    <FormButton
                        component={SubmitButton}
                    >
                        Log in
                    </FormButton>
                </Form>
            )}
        </Formik>
    );
};

export { LoginForm };
