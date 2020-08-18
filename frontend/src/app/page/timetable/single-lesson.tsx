import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

import { TeacherModal } from 'app/components/modalContent/teacherModal';
import { StudentModal } from 'app/components/modalContent/studentModal';

import { scheduleCalc } from './schedule-calc';

import styles from './lessons.module.scss';

interface Props {
    currentLesson: number;
    thisLesson: any;
    handleOpenClassroom: any;
    schedule: any | null;
    userRole: string[];
    date: string;
    homepage?: boolean;
}

const { lesson, activeLesson, endedLesson, lessonBarContent, lessonBarTime, lessonBar, lessonBarWithBreak, activeInSchedules } = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const { currentLesson, thisLesson, handleOpenClassroom, schedule, userRole, date, homepage } = props;
    const [modalVisible, setModalVisible] = useState(false);

    // define classNames
    const lessonClass = classNames(
        lesson,
        currentLesson === thisLesson.id && activeLesson,
        currentLesson > thisLesson.id && endedLesson,
        !homepage && activeInSchedules,
    );

    // get thisLesson start as 8:00
    const lessonStart: string = schedule.length !== 0 ? (schedule[thisLesson.time - 1].startTime).substr(0, 5) : 'undef';

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
            <div className={lessonClass} key={thisLesson.id}>
                <div onClick={() => showModal(thisLesson.id)} className={lessonBar}>
                    <div className={lessonBarWithBreak}>
                        <div
                            className={lessonBarContent}
                        >
                            <h1>{thisLesson.subject}</h1>
                            {
                                thisLesson.lessonInformation[0] !== undefined &&
                                <h1>1</h1>
                            }
                            {thisLesson.id === currentLesson ?

                                homepage ?

                                    (
                                        <>
                                            <img
                                                alt="Lesson camera icon"
                                                src={'icons/camera.svg'}
                                            />
                                            <Button
                                                type="primary"
                                                shape="round"
                                                className={styles.toVideoButton}
                                                onClick={() => handleOpenClassroom(thisLesson.id)}
                                            >
                                                Join a Class
                                            </Button>
                                        </>
                                    )

                                    : (
                                        <div onClick={() => handleOpenClassroom(thisLesson.id)}>
                                            <img
                                                alt="Lesson modal icon"
                                                src={'icons/camera.svg'}
                                            /> <span>live</span>
                                        </div>
                                    )

                                : null}
                        </div>
                        < span
                            data-tip="Break"
                            style={{ height: scheduleCalc.getBreakTime(schedule, thisLesson.time) }}
                            className={styles.breakSpan}
                        />
                        <ReactTooltip />
                    </div>
                </div>
            </div>
        </ >

    );

};

export { SingleLesson };
