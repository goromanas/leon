import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';

import { TeacherModal } from 'app/components/modalContent/teacherModal';

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

const { lesson, activeLesson, endedLesson, lessonBarContent, lessonBarTime, lessonBar, lessonBarWithBreak } = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const { currentLesson, thisLesson, handleOpenClassroom, schedule, userRole, date, homepage } = props;
    const [modalVisible, setModalVisible] = useState(false);

    // define classNames
    const lessonClass = classNames(
        lesson,
        currentLesson === thisLesson.id && activeLesson,
        currentLesson > thisLesson.id && endedLesson,
    );

    // get thisLesson start as 8:00
    const lessonStart: string = schedule.length !== 0 ? (schedule[thisLesson.time - 1].startTime).substr(0, 5) : 'undef';

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
            {modalButton() ?
                (
                    <></>

                ) :
                (
                    <Modal
                        key={thisLesson.id}
                        title={thisLesson.subject}
                        visible={modalVisible}
                        footer={null}
                        onCancel={handleOk}
                        okButtonProps={{
                            children: 'Custom OK',
                        }}
                    >
                        <TeacherModal lessonId={thisLesson.id} onClose={handleOk} date={date} />
                    </Modal>
                )}
            <div className={lessonClass} key={thisLesson.id}>
                <div onClick={() => showModal(thisLesson.id)} className={lessonBar}>

                    {(homepage || thisLesson.day === 1) && (
                        <div
                            className={lessonBarTime}
                            style={{ marginBottom: scheduleCalc.getBreakTime(schedule, thisLesson.time) }}
                        >
                            <span>{schedule && lessonStart}</span>
                            <span>{thisLesson.time}</span>
                        </div>
                    )}
                    <div className={lessonBarWithBreak}>
                        <div
                            className={lessonBarContent}
                        >
                            <h1>{thisLesson.subject}</h1>
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
