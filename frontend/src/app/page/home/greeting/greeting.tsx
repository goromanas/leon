import React from 'react';

import styles from './greeting.module.scss';

interface Props {
    firstname: string;
}

const Greeting: React.FC<Props> = (
    { firstname }) =>

    (
        <>
            <span
                className={styles.greeting}
            >
                Have a good day, {firstname}
            </span>
        </>
    );

export { Greeting };
