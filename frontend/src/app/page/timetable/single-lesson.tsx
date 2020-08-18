import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';

import { TeacherModal } from 'app/components/modalContent/teacherModal';
import { StudentModal } from 'app/components/modalContent/studentModal';

import styles from './lessons.module.scss';

interface Props {
    currentLesson: number;
    thisLesson: any;
    handleOpenClassroom: any;
    schedule: any | null;
    userRole: string[];
    date: string;
}

const {listItem, activeLesson, endedLesson, listNumber, listContent} = styles;

const SingleLesson: React.FC<Props> = (props) => {

    const {currentLesson, thisLesson, handleOpenClassroom, schedule, userRole, date} = props;
    const [modalVisible, setModalVisible] = useState(false);

    // define classNames
// console.log(thisLesson);
    const listClass = classNames(
        listItem,
        currentLesson === thisLesson.id && activeLesson,
        currentLesson > thisLesson.id && endedLesson,
    );
    const numberClass = classNames(
        listNumber,
        currentLesson === thisLesson.id && activeLesson,
        currentLesson > thisLesson.id && endedLesson,
    );
    const contentClass = classNames(
        listContent,
        currentLesson === thisLesson.id && activeLesson,
        currentLesson > thisLesson.id && endedLesson,
    );

    // get thisLesson start as 8:00
    const lessonStart: string = schedule ? (schedule.startTime).substr(0, 5) : 'undef';

    const checkUserRoleForModal = (): boolean =>
        userRole.includes('STUDENT') || userRole.includes('PARENT');

    const showModal = (index: number) => {
        setModalVisible(!modalVisible);
    };

    const checkLessonInformation = (index: number) => {
        if (thisLesson.lessonInformation[0]) {
            showModal(index);
        }
    };
    // console.log(date);
    // console.log(thisLesson);
    const handleOk = () => {
        setModalVisible(!modalVisible);
    };
// console.log(thisLesson.lessonInformation[0]?.date);
    // console.log(thisLesson.lessonInformation[0] && thisLesson.lessonInformation[0]);
    // console.log(thisLesson.lessonInformation[0] && thisLesson.lessonInformation[0].date)
    // console.log(date);
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
                {checkUserRoleForModal() ?
                    (<StudentModal
                        subject={thisLesson.subject}
                        onClose={handleOk}
                        lessonInformation={
                            thisLesson.lessonInformation
                                .filter((lesson: Api.LessonInformationDto) => lesson.date === date)}
                        classId={thisLesson.id}
                        date={date}
                    />) :
                    (<TeacherModal subject={thisLesson.subject} lessonId={thisLesson.id} onClose={handleOk} date={date}
                                   lessonInformation={
                                       thisLesson.lessonInformation
                                           .filter((lesson: Api.LessonInformationDto) => lesson.date === date)}/>)}
            </Modal>

            < li className={listClass} key={thisLesson.id} onClick={() => showModal(thisLesson.id)}>
                <div
                    className={numberClass}
                >
                    <span>{schedule && lessonStart}</span>
                    <span>{thisLesson.time}</span>
                </div>
                <div
                    className={contentClass}
                >
                    {thisLesson.subject}
                    . ID: {thisLesson.id}
                    {thisLesson.id === currentLesson ? (
                        <Button
                            type="primary"
                            className={styles.toVideoButton}
                            onClick={() => handleOpenClassroom(thisLesson.id)}
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
