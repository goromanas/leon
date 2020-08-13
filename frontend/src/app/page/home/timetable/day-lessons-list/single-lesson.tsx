import React, { useState, useEffect } from 'react';
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

const { listItem, activeLesson, upcomingLesson, listNumber, listContent } = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const { currentLesson, positionInList, lesson, handleOpenClassroom, schedule, userRole } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [activeModal, setActiveModal] = useState<any>(null);

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
    const lessonStart: string = (schedule.startTime).substr(0, 5);

    const modalButton = (): boolean =>
        userRole[0] === 'STUDENT' || userRole[0] === 'PARENT';

    const showModal = (index: number) => {
        setModalVisible(true);
        setActiveModal(index);
    };

    const handleOk = (e: any) => {
        // console.log(e);
        setModalVisible(false);
        setActiveModal(null);
    };

    const handleCancel = (e: any) => {
        // console.log('e');
        setModalVisible(false);
        setActiveModal(null);
    };

    return (
        <>
            < li className={listClass} key={lesson.id} onClick={() => showModal(lesson.id)} >
                {modalButton() ?
                    (
                        <Modal
                            key={lesson.id}
                            title={lesson.subject}
                            visible={activeModal === lesson.id}
                            onOk={() => setActiveModal(null)}
                            onCancel={() => setActiveModal(null)}
                            footer={null}
                            okButtonProps={{
                                children: 'Custom OK',
                            }}
                        >
                            <Counter subject={lesson.subject} />
                        </Modal>
                    ) :
                    (
                        <Modal
                            key={lesson.id}
                            title={lesson.subject}
                            visible={activeModal === lesson.id}
                            onOk={() => setActiveModal(null)}
                            onCancel={() => setActiveModal(null)}
                            // footer={this.modalButton() ? ' ' : ' '}
                            okButtonProps={{
                                children: 'Custom OK',
                            }}
                        >
                            <p>{lesson.subject}</p>
                            <p>{userRole}</p>
                            <p>{modalButton() ? 'tiesa' : 'netiesa'}</p>
                        </Modal>
                    )}
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
            </li >
        </>
    );

};

export { SingleLesson };
