import React from 'react';
import { Field, Form, Formik, FormikConfig } from 'formik';
import { Button } from 'antd';

import { InputField } from './input';
import { FormErrors } from 'app/model/form-errors';

export interface MessageValue {
    message: string;
}

export type ChatErrors = FormErrors<MessageValue>;

type Props = FormikConfig<MessageValue>;

const ChatForm: React.FC<Props> = (props: Props) => {
    const { initialValues, onSubmit } = props;

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
                <Form>
                    <Field component={ InputField } name="message" placeholder="Message..." />
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export { ChatForm };
