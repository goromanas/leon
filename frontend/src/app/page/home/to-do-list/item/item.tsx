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
}

const Item: React.FC<Props> = (props) => {
    const { lessonSubject, topic, type, userRole, information, date } = props;
    const [modalVisible, setModalVisible] = useState(false);

    const handleOk = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            <Modal
                // className={styles.modal}
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
            <div className={styles.itemtitle} onClick={handleOk}>
                <div>
                    {type.includes('Homework') ? <Badge color={'orange'} /> : ''}
                    {type.includes('Test') ? <Badge color={'red'} /> : ''}
                    <span className={styles.itemsubject}>{lessonSubject}</span>
                </div>

                <span >View</span>
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
