import React from 'react';

import styles from './teacher-feedback.module.scss';

const TeacherFeedback: React.FC = () =>

    ( <>
        <div className={styles.homeImage}>
        <img
            alt="Homepage"
            src={'images/homeart.svg'}
        />
    </div>
    <div className={styles.homeModal}>
        <h1>Teacher’s Recomendation</h1>
        <div>
            <img
                alt="Homepage User"
                src={'icons/homeuser.svg'}
            />
            <p>If people only knew how hard I’ve worked to gain my mastery, it wouldn’t seem so wonderful at all.</p>
        </div>

    </div>
    </>
    );

export { TeacherFeedback };
