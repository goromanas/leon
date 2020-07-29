import React from 'react';
// tslint:disable-next-line:no-submodule-imports
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

import styles from './input-icon.module.scss';

interface OwnProps<T> {
    component: React.ComponentType<T & { className?: string }>;
}

type Props<T = {}> = OwnProps<T> & AntdIconProps;

const InputIcon: React.FC<Props> = props => {
    const {
        component: Component,
    } = props;

    return (
        <Component
            {...props}
            className={styles.inputIcon}
        />
    );
};

export { InputIcon };
