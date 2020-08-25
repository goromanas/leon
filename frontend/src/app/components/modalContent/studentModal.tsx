import React from 'react';

import styles from './studentModal.module.scss';

const StudentModal: React.FC<{ onClose: () => void, lessonInformation?: any, classId?: number, subject: string, date?: string }> =
    (props) =>
        (
            <div className={styles.studentModal} style={{ boxShadow: 'none' }}>
                <div className={styles.circle}>
                    <img
                        alt="Lesson modal icon"
                        src={'icons/science.svg'}
                    />
                </div>
                <h2>{props.subject}</h2>
                <div className={styles.subjectTopic}>
                    <p>{props.subject}</p>
                    <h3>{props.lessonInformation[0] ? props.lessonInformation[0].topic : 'No lesson topic'}</h3>
                </div>
                <div className={styles.assignmentBlock}>
                    {
                        props.lessonInformation[0] && props.lessonInformation[0].assignment.includes('Homework') ?
                            <p className={styles.homeWork}>Homework</p> : null}
                    {props.lessonInformation[0] && props.lessonInformation[0].assignment.includes('Test') ?
                        <p className={styles.test}>Test</p> : null}
                </div>
                <div className={styles.homeworkField}>
                    {
                        props.lessonInformation[0] ? props.lessonInformation[0].information : 'No homework or information'
                    }
                </div>
            </div>
        );

export { StudentModal };
