import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';

import { Counter } from 'app/components/modalContent/modalContent';

import styles from './lessons.module.scss';

interface Props {
    positionInList: number;
    currentLesson: number;
    lesson: any;
    handleOpenClassroom: any;
    schedule: Api.ScheduleDto | null;
    userRole: string[];
}

const {listItem, activeLesson, upcomingLesson, listNumber, listContent} = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const {currentLesson, positionInList, lesson, handleOpenClassroom, userRole} = props;

    const listClass = classNames(
        listItem,
        positionInList === currentLesson && activeLesson,
        positionInList > currentLesson && upcomingLesson,
    );
    const numberClass = classNames(
        listNumber,
        positionInList === currentLesson && activeLesson,
        positionInList > currentLesson && upcomingLesson,
    );
    const contentClass = classNames(
        listContent,
        positionInList === currentLesson && activeLesson,
        positionInList > currentLesson && upcomingLesson,
    );
    // const lessonStart: string = (schedule.startTime).substr(0, 5);

    const modalButton = (): boolean =>
        userRole.includes('STUDENT') || userRole.includes('PARENT');

    const [modalVisible, setModalVisible] = useState(false);
    // const [activeModal, setActiveModal] = useState(null);

    const showModal = (index: number) => {
        setModalVisible(!modalVisible);
        // setActiveModal(index);
    };

    const handleOk = () => {
        setModalVisible(!modalVisible);
        // setActiveModal(null);
    };
    //
    // const handleCancel = () => {
    //     setModalVisible(false);
    // setActiveModal(null);
    // };

    return (
        <>
            {modalButton() ?
                (
                    <Modal
                        key={lesson.id}
                        title={lesson.subject}
                        visible={modalVisible}
                        onOk={() => handleOk()}
                        onCancel={() => handleOk()}
                        okButtonProps={{
                            children: 'Custom OK',
                        }}
                    >
                        <Counter subject={lesson.subject}/>
                    </Modal>
                ) :
                (
                    <Modal
                        key={lesson.id}
                        title={lesson.subject}
                        visible={modalVisible}
                        onOk={() => handleOk()}
                        onCancel={() => handleOk()}
                        okButtonProps={{
                            children: 'Custom OK',
                        }}
                    >
                        <p>{lesson.subject}</p>
                        <p>{userRole}</p>
                        <input maxLength={13}></input>
                        <p>{modalButton() ? 'tiesa' : 'netiesa'}</p>
                    </Modal>
                )}
            <li className={listClass} key={lesson.id} onClick={() => showModal(lesson.id)}>
                <div
                    className={numberClass}
                >
                    {/* <span>{schedule && lessonStart}</span> */}
                    <span>{positionInList}</span>
                </div>
                <div
                    className={contentClass}
                >
                    {lesson.subject}
                    {positionInList === currentLesson ? (
                        <Button
                            type="primary"
                            className={styles.toVideoButton}
                            onClick={() => handleOpenClassroom(lesson.id)}
                        >
                            Live lesson
                        </Button>
                    ) : null}
                </div>
            </li>
        </>
    );

};

export { SingleLesson };
