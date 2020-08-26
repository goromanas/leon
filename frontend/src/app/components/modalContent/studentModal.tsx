import React from 'react';

import styles from './studentModal.module.scss';

const StudentModal: React.FC<{ onClose: () => void, lessonInformation?: any, classId?: number, subject: string, date?: string }> =
    (props) =>
        (
            <div className={styles.studentModal} style={{ boxShadow: 'none' }}>
                <div className={styles.subject}>
                    <span>{props.subject}</span>
                </div>
                <div className={styles.topicWrapper}>
                    <div className={styles.circle}>
                        <img
                            alt="Lesson modal icon"
                            src={`icons/subjects/${props.subject}.svg`}
                        />
                    </div>
                    <div>
                        <h3>{props.lessonInformation[0] ? props.lessonInformation[0].topic : 'No lesson topic'}</h3>
                    </div>
                </div>
                <div className={styles.assignmentWrapper}>
                    <div>
                        {props.lessonInformation[0] && props.lessonInformation[0].assignment.includes('Homework') ?
                            <span className={styles.homeWork}>Homework</span> : null}
                        {props.lessonInformation[0] && props.lessonInformation[0].assignment.includes('Test') ?
                            <span className={styles.test}>Test</span> : null}
                    </div>
                </div>
                <div className={styles.homeworkField}>
                    {props.lessonInformation[0] ? props.lessonInformation[0].information : 'No homework or information'}
                </div>
            </div >
        );

export { StudentModal };
