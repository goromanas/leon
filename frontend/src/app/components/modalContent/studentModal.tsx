import React from 'react';
import styles from './teacherModal.module.scss';

interface Props {
    lessonInformation: any
}


const StudentModal: React.FC<{ onClose: () => void, lessonInformation?: any, classId: number }> = (props) => {
    // console.log(props.lessonInformation[0].information);
    return (
        <div className={styles.teacherModal}>
            <p>{props.lessonInformation[0]  ? props.lessonInformation[0].topic : 'No topic yet!'}</p>
            <p>{props.lessonInformation[0]  ? props.lessonInformation[0].information : 'No information!'}</p>
            <p>{props.lessonInformation[0]  ? props.lessonInformation[0].assignment.join(' ') : 'No assignments!'}</p>

        </div>

    );

};

export { StudentModal };
