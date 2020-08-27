import React from 'react';

import styles from 'app/components/avatar/avatar.module.scss';

interface Props {
    firstName: string;
}

const Avatar: React.FC<Props> = (props) => (
    <div className={styles.avatar}>
        < img
            alt=""
            src={`/icons/avatars/${props.firstName}.svg`}
            onError={(e) => { e.currentTarget.src = `/icons/avatars/default.svg`; }}
        />
    </div>
);

export { Avatar };
