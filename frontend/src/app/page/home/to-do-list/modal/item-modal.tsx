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

    return (
        <div className={styles.studentModal} style={{ boxShadow: 'none' }}>
            <div className={styles.circle}>
                <img
                    alt="Lesson modal icon"
                    src={`icons/subjects/${lessonSubject}.svg`}
                />
            </div>
            <h2>{lessonSubject}</h2>
            <div className={styles.subjectTopic}>
                <p>{lessonSubject}</p>
                <h3>{topic}</h3>
                <h4>{date}</h4>
            </div>
            <div className={styles.assignmentBlock}>
                {
                    type.includes('Homework') ?
                        <p className={styles.homeWork}>Homework</p> : null}
                {type.includes('Test') ?
                    <p className={styles.test}>Test</p> : null}
            </div>
            <div className={styles.homeworkField}>
                {information}
            </div>
        </div>
    );

};

export { ItemModal };
