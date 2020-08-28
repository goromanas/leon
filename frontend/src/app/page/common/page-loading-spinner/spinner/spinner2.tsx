import React from 'react';

import styles from './spinner2.module.scss';

interface Props {
    theme?: string;
}

const Spinner: React.FC<Props> = (props) => (

    <div className={styles.ldsRipple}>
        <div />
        <div />
    </div>

);

export { Spinner };
