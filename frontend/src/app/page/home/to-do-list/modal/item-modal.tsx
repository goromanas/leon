import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Modal } from 'antd';
import { subtract } from 'lodash';

import styles from './item-modal.module.scss';

interface Props {
    lessonSubject: string;
    topic: string;
    type: string[];
    userRole: string[] | null;
    information: string;
    date: string;
}

const ItemModal: React.FC<Props> = (props) => {
    const { lessonSubject, topic, type, userRole, information, date } = props;

    const formatDate = (date: string): string => {
        const outputDate = new Date(date);
        return monthName(outputDate.getMonth()) + ', ' + outputDate.getDate();

    };

    const monthName = (month: number): string => {
        const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[month];
    };

    return (
        <div className={styles.studentModal} style={{ boxShadow: 'none' }}>
            <div className={styles.subject}>
                <span>{lessonSubject}</span>
            </div>
            <div className={styles.topicWrapper}>
                <div className={styles.circle}>
                    <img
                        alt="Lesson modal icon"
                        src={`icons/subjects/${lessonSubject}.svg`}
                    />
                </div>
                {/* <h2>{lessonSubject}</h2> */}
                <div>
                    <h3>{topic}</h3>
                </div>
            </div>
            <div className={styles.assignmentWrapper}>
                <div>
                    {type.includes('Homework') ?
                        <span className={styles.homeWork}>Homework</span> : null}
                    {type.includes('Test') ?
                        <span className={styles.test}>Test</span> : null}
                </div>
                <div>
                    <span className={styles.date}>{formatDate(date)}</span>
                </div>
            </div>
            <div className={styles.homeworkField}>
                {information}
            </div>
        </div >
    );

};

export { ItemModal };
