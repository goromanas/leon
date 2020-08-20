import React from 'react';
import { Field, Form, Formik, FormikConfig, FormikHelpers } from 'formik';
import { Button, Avatar } from 'antd';
import { UserOutlined, RightOutlined } from '@ant-design/icons';

import { FormErrors } from 'app/model/form-errors';

import { InputField } from './input';

import styles from './chat-form.module.scss';

export interface MessageValue {
    message: string;
}

interface OwnProps {

}

export type ChatErrors = FormErrors<MessageValue>;

type Props = FormikConfig<MessageValue> & OwnProps;

const ChatForm: React.FC<Props> = (props: Props) => {
    const { initialValues, onSubmit } = props;
// console.log(initialValues)
//     const isDisabled = initialValues.message === ''? true: false
    return (
        <div className={styles.container}>
            <Avatar className={styles.avatar} size="large" icon={<UserOutlined className={styles.userIcon} style={{ fontSize: "25px" }} />} style={{ color: "grey", float: "right" }} />
        <div className={styles.sendMessage}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {() => (
                    <Form>
                        <Field
                            name="message"
                            placeholder="Message..."
                            className={styles.chatInput}
                            autoComplete="off"
                        />
                        <Button  htmlType="submit">
                            Send <RightOutlined />
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
            </div>
    );
};

export { ChatForm };
