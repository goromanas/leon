import React from 'react';
import { Field, Form, Formik, FormikConfig } from 'formik';
import { Button } from 'antd';

import { FormErrors } from 'app/model/form-errors';
import { InputField } from './input';

export interface MessageValue {
    message: string;
}

interface OwnProps {
    addFile: (file: any) => void;
}

export type ChatErrors = FormErrors<MessageValue>;

type Props = FormikConfig<MessageValue> & OwnProps;

const ChatForm: React.FC<Props> = (props: Props) => {
    const { initialValues, onSubmit, addFile } = props;

    const changeHandler = (event: any) => {
        addFile(event.target.files[0]);
        // console.log(event.target.files[0]);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {() => (
                <Form>
                    <Field component={InputField} name="message" placeholder="Message..." />
                    <input type="file" name="file" onChange={changeHandler} />
                    <Button type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export { ChatForm };
