import React from 'react';

import styles from './spinner.module.scss';

interface Props {
    theme?: string;
}

const Spinner: React.FC<Props> = (props) => (

    <div className={styles.spinner}>
        <div className={props.theme === 'login' ? styles.bookLogin : styles.book}>
            <div className={styles.inner}>
                <div className={styles.left} />
                <div className={styles.middle} />
                <div className={styles.right} />
            </div>
            <ul>
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
                <li />
            </ul>
        </div>
    </div>


);

export { Spinner };
