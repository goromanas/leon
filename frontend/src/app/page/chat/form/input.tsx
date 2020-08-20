import React from 'react';
import { Form , Input } from 'antd';
import { FieldProps as FormikFieldProps } from 'formik';
import { InputProps } from 'antd/lib/input';

import styles from './input.module.scss';

interface OwnProps {
    label?: string;
}

export type FieldWrapperProps = FormikFieldProps & InputProps & OwnProps;

class InputField extends React.Component<FieldWrapperProps> {

    public render(): React.ReactNode {
        const {
            label,
            field,
            field: { name },
            form: { touched, errors, dirty },
            disabled,
            required,
            ...rest
        } = this.props;

        const isTouched = touched[name];
        const error = errors[name];

        const validateStatus = isTouched ? error && 'error' : '';
        const validateMessage = isTouched && error;

        return (
            <Form.Item
                required={required}
                label={label}
                validateStatus={validateStatus}
                help={validateMessage}

            >
                <Input
                    className={styles.chatInput}
                    {...field}
                    {...rest}
                    autoComplete="off"
                />
                {/*<Input.TextArea {...field} />*/}
            </Form.Item>
        );
    }

}

export { InputField };
