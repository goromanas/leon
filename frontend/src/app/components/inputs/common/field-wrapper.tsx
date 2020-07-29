import React from 'react';
import { Form } from 'antd';
import { FieldProps as FormikFieldProps } from 'formik';
/* tslint:disable:no-submodule-imports */
import { InputProps } from 'antd/lib/input';
/* tslint:enable:no-submodule-imports */

interface OwnProps {
    label?: string;
    component: React.ComponentType<InputProps>;
}

export type FieldWrapperProps = FormikFieldProps & InputProps & OwnProps;

class FieldWrapper extends React.Component<FieldWrapperProps> {

    public render(): React.ReactNode {
        const {
            label,
            field,
            field: { name },
            form: { touched, errors, isSubmitting },
            disabled,
            required,
            component: Component,
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
                <Component
                    {...field}
                    {...rest}
                    disabled={disabled || isSubmitting}
                />
            </Form.Item>
        );
    }

}

export { FieldWrapper };
