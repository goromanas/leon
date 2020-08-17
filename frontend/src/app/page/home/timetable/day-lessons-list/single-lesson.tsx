import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';

import styles from './lessons.module.scss';
import { TeacherModal } from 'app/components/modalContent/teacherModal';
import moment from 'moment';
import { StudentModal } from 'app/components/modalContent/studentModal';

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
    date: string;
}

const {listItem, activeLesson, endedLesson, listNumber, listContent} = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const {currentLesson, positionInList, lesson, handleOpenClassroom, schedule, userRole, scheduleTimes, lessons,
           isThisDay, date} = props;
    const [modalVisible, setModalVisible] = useState(false);
    const listClass = classNames(
        listItem,
        isThisDay && positionInList === currentLesson && moment().format('YYYY-MM-DD') === date && activeLesson,
        isThisDay && positionInList < currentLesson && moment().format('YYYY-MM-DD') === date && endedLesson,
    );
    const numberClass = classNames(
        listNumber,
        isThisDay && positionInList === currentLesson && moment().format('YYYY-MM-DD') === date && activeLesson,
        isThisDay && positionInList < currentLesson && moment().format('YYYY-MM-DD') === date && endedLesson,
    );
    const contentClass = classNames(
        listContent,
        isThisDay && positionInList === currentLesson && moment().format('YYYY-MM-DD') === date && activeLesson,
        isThisDay && positionInList < currentLesson && moment().format('YYYY-MM-DD') === date && endedLesson,
    );
    const lessonStart: string = scheduleTimes.length >= lessons.length ? (schedule.startTime).substr(0, 5) : 'undef';

    const modalButton = (): boolean =>
        userRole.includes('STUDENT') || userRole.includes('PARENT');

    const showModal = (index: number) => {
        setModalVisible(!modalVisible);
    };
    const handleOk = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <>
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={handleOk}
                okButtonProps={{
                    children: 'Custom OK',
                }}

            >
                {modalButton() ?
                    (<StudentModal
                        subject={lesson.subject}
                        onClose={handleOk}
                        lessonInformation={lesson.lessonInformation.filter((lesson: any) => lesson.date == date)}
                        classId={lesson.id}
                    />) :
                    (<TeacherModal lessonId={lesson.id} onClose={handleOk} date={date}/>)}
            </Modal>

            < li className={listClass} key={lesson.id} onClick={() => showModal(lesson.id)}>

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
                    {positionInList === currentLesson && isThisDay && moment().format('YYYY-MM-DD') === date ? (
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

    );

};

export { SingleLesson };
