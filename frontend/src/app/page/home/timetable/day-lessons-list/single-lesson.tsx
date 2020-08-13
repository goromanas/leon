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
    lessons: Api.Lesson[];
    scheduleTimes: Api.ScheduleDto[];
    isThisDay: boolean;
}

const { listItem, activeLesson, endedLesson, listNumber, listContent } = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const { currentLesson, positionInList, lesson, handleOpenClassroom, schedule, userRole, scheduleTimes, lessons, isThisDay } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [activeModal, setActiveModal] = useState<any>(null);

    const listClass = classNames(
        listItem,
        isThisDay && positionInList === currentLesson && activeLesson,
        isThisDay && positionInList < currentLesson && endedLesson,
    );
    const numberClass = classNames(
        listNumber,
        isThisDay && positionInList === currentLesson && activeLesson,
        isThisDay && positionInList < currentLesson && endedLesson,
    );
    const contentClass = classNames(
        listContent,
        isThisDay && positionInList === currentLesson && activeLesson,
        isThisDay && positionInList < currentLesson && endedLesson,
    );
    const lessonStart: string = scheduleTimes.length >= lessons.length ? (schedule.startTime).substr(0, 5) : 'undef';

    const modalButton = (): boolean =>
        userRole.includes('STUDENT') || userRole.includes('PARENT');

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
                        <Counter subject={lesson.subject} />

                    </Modal >
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

                        <input maxLength={13} />
                        <p>{modalButton() ? 'tiesa' : 'netiesa'}</p>
                    </Modal >
                )}
            < li className={listClass} key={lesson.id} onClick={() => showModal(lesson.id)} >

                <div
                    className={numberClass}
                >
                    <span>{schedule && lessonStart}</span>
                    <span>{positionInList}</span>
                </div>
                <div
                    className={contentClass}
                >
                    {lesson.subject}
                    {positionInList === currentLesson && isThisDay ? (
                        <Button
                            type="primary"
                            className={styles.toVideoButton}
                            onClick={() => handleOpenClassroom(lesson.id)}
                        >
                            Live
                        </Button>
                    ) : null}
                </div>
            </li>
        </ >

    )

}

export { SingleLesson };
