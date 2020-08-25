import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Modal } from 'antd';

import { TeacherModal } from 'app/components/modalContent/teacherModal';
import { StudentModal } from 'app/components/modalContent/studentModal';

import styles from './item.module.scss';

interface Props {
    lessonSubject: string;
    topic: string;
    type: string[];
    userRole: string[] | null;
}

const Item: React.FC<Props> = (props) => {
    const { lessonSubject, topic, type, userRole } = props;
    const [modalVisible, setModalVisible] = useState(false);

    const handleOk = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            <div className={styles.itemtitle}>
                <div>
                    {type.includes('Homework') ? <Badge color={'orange'} /> : ''}
                    {type.includes('Test') ? <Badge color={'red'} /> : ''}
                    <span className={styles.itemsubject}>{lessonSubject}</span>
                </div>

                <span onClick={handleOk}>View</span>
            </div>
            <div>
                <span className={styles.itemtopic}>
                    {topic}
                </span>
            </div>
        </>
    );

};

export { Item };
