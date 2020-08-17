import React from 'react';

import styles from './studentModal.module.scss';

const StudentModal: React.FC<{ onClose: () => void, lessonInformation?: any, classId: number, subject: string }> =
    (props) =>
        (
            <div className={styles.studentModal}>

                <div className={styles.circle}>
                    <img
                        alt="Lesson modal icon"
                        src={'icons/science.svg'}
                    />
                </div>

                <div className={styles.subjectTopic}>
                    <p>{props.subject}</p>
                    <h3>{props.lessonInformation[0] ? props.lessonInformation[0].topic : 'No lesson topic'}</h3>
                </div>
                <div className={styles.homework}>
                    <h4>Homework and other information</h4>
                </div>
                <div className={styles.homeworkField}>
                    {
                        props.lessonInformation[0] ? props.lessonInformation[0].information : 'No homework or information'
                    }
                </div>
                <div>
                    <h4>Due assignments:</h4>
                    {
                        props.lessonInformation[0] ? props.lessonInformation[0].assignment.join(' ') : 'No due assignments'
                    }

                </div>
            </div>
        );

export { StudentModal };
