import React from 'react';
import { Button } from 'antd';

import { FormButtonProps } from 'app/components/buttons/common/form-button';

import styles from './submit-button.module.scss';

const SubmitButton: React.FC<FormButtonProps> = (props: FormButtonProps) => {
    const {
        formik: { isSubmitting },
        disabled,
        ...rest
    } = props;

    return (
        <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            disabled={disabled || isSubmitting}
            loading={isSubmitting}
            {...rest}
        />
    );
};

export { SubmitButton };
