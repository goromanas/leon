import React from 'react';
import { Button, Select } from 'antd';
import { Field, Form, Formik, FormikConfig } from 'formik';
import _ from 'lodash';

import { FormButton, SubmitButton } from 'app/components/buttons';
import { InputField, SelectField } from 'app/components/inputs';
import { FormErrors } from 'app/model/form-errors';

import styles from './user-details-form.module.scss';

const { Option } = Select;

interface OwnProps {
    onCancel: () => void;
}

export type UserDetailsErrors = FormErrors<Api.UserDto>;

type Props = OwnProps & FormikConfig<Api.UserDto>;

interface State {
    users: Api.UserDto[];
}

class UserDetailsForm extends React.Component<Props, State> {
    public render(): React.ReactNode {
        const { initialValues, onSubmit, validate, onCancel } = this.props;

        return (
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                {({ setFieldValue }) => (
                    <Form>
                        <div className={styles.formContainer}>
                            {!_.isNil(initialValues.id) && (
                                <Field component={InputField} label="ID" name="id" disabled={true} />
                            )}
                            <Field
                                component={InputField}
                                label="Username"
                                name="username"
                                placeholder="Please enter username"
                            />
                            <Field
                                component={InputField}
                                label="Name"
                                name="firstName"
                                placeholder="Please enter name"
                            />
                            <Field
                                component={InputField}
                                label="Surname"
                                name="lastName"
                                placeholder="Please enter surname"
                            />
                            <Field
                                component={InputField}
                                label="E-mail"
                                name="email"
                                placeholder="Please enter e-mail"
                            />
                            <Field
                                component={SelectField}
                                label="Roles"
                                name="role"
                                placeholder="Please select roles"
                                mode="multiple"
                                onChange={(option: string) => setFieldValue('role', option)}
                            >
                                <Option value="STUDENT">Student</Option>
                                <Option value="TEACHER">Teacher</Option>
                                <Option value="ADMIN">Admin</Option>
                                <Option value="PARENT">Parent</Option>
                            </Field>
                        </div>
                        <FormButton component={SubmitButton}>Save</FormButton>
                        <Button onClick={onCancel}>Cancel</Button>
                    </Form>
                )}
            </Formik>
        );
    }
}

export { UserDetailsForm };
