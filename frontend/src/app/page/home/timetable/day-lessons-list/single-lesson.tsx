import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';

import styles from './lessons.module.scss';
import { TeacherModal } from 'app/components/modalContent/teacherModal';
import { navigationService } from 'app/service/navigation-service';

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
    date:String;
}

const { listItem, activeLesson, endedLesson, listNumber, listContent } = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const { currentLesson, positionInList, lesson, handleOpenClassroom, schedule, userRole, scheduleTimes, lessons, isThisDay,date } = props;
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



    return (
        <>
            {modalButton() ?
                (
                    <></>
                    // <Modal
                    //     key={lesson.id}
                    //     title={lesson.subject}
                    //     visible={modalVisible}
                    //     onOk={() => handleOk()}
                    //     onCancel={() => handleOk()}
                    //     footer={null}
                    //     okButtonProps={{
                    //         children: 'Custom OK',
                    //     }}
                    // >
                    //
                    // </Modal>
                ) :
                (
                    <Modal
                        key={lesson.id}
                        title={lesson.subject}
                        visible={modalVisible}
                        footer={null}
                        onCancel={handleOk}
                        okButtonProps={{
                            children: 'Custom OK',
                        }}

                    >
                        <TeacherModal lessonId={lesson.id} onClose={handleOk}/>
                    </Modal>
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
