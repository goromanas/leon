import React from 'react';
import { connect, FormikContextType, FormikValues } from 'formik';
/* tslint:disable:no-submodule-imports */
import { ButtonProps } from 'antd/lib/button';
/* tslint:enable:no-submodule-imports */

export type FormButtonProps = ButtonProps & { formik: FormikContextType<FormikValues> };

interface OwnProps {
    component: React.ComponentType<FormButtonProps>;
}

type Props = FormButtonProps & OwnProps;

const FormButtonComponent: React.FC<Props> = (props: Props) => {
    const {
        component: Component,
        ...rest
    } = props;

    return (
        <Component
            {...rest}
        />
    );
};

const FormButton = connect<OwnProps>(FormButtonComponent);

export { FormButton };
