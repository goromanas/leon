import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';

import styles from './item.module.scss';

interface Props {
    lessonSubject: string;
    topic: string;
    type: string[];
}

const Item: React.FC<Props> = (
    { lessonSubject, topic, type }) =>

    (
        <>
            <div className={styles.itemtitle}>
                <div>
                    <Badge color={type.includes('Homework') ? 'orange' : 'red'} />
                    <span className={styles.itemsubject}>{lessonSubject}</span>
                </div>
                <Link to="#">View</Link>
            </div>
            <div>
                <span className={styles.itemtopic}>
                    {topic}
                </span>
            </div>
        </>
    );

export { Item };
