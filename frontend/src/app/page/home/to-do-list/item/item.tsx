import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Modal } from 'antd';

import styles from './item.module.scss';
import { ItemModal } from '../modal/item-modal';

interface Props {
    lessonSubject: string;
    topic: string;
    type: string[];
    userRole: string[] | null;
    information: string;
    date: string;
    classRoom: string | null;
}

const Item: React.FC<Props> = (props) => {
    const { lessonSubject, topic, type, userRole, information, date, classRoom } = props;
    const [modalVisible, setModalVisible] = useState(false);

    const handleOk = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <div onClick={handleOk}>
            <Modal
                className={styles.modal}
                style={{ borderRadius: '30px', overflow: 'hidden' }}
                visible={modalVisible}
                footer={null}
                onCancel={handleOk}
                okButtonProps={{
                    children: 'Custom OK',
                }}
            >
                <ItemModal
                    lessonSubject={lessonSubject}
                    topic={topic}
                    type={type}
                    userRole={userRole}
                    information={information}
                    date={date}
                />
            </Modal>
            <div className={styles.itemtitle} >
                <div>
                    {type.includes('Homework') ? <Badge color={'orange'} /> : ''}
                    {type.includes('Test') ? <Badge color={'red'} /> : ''}
                    {userRole.includes('STUDENT') ? <span className={styles.itemsubject}>{lessonSubject} </span> : ''}
                    {userRole.includes('TEACHER') ? <span className={styles.itemsubject}>{classRoom}</span> : ''}
                </div>

                {/* <span className={styles.view}>View</span> */}
            </div>
            <div>
                <span className={styles.itemtopic}>
                    {topic}
                </span>
            </div>
        </div>
    );

};

export { Item };
