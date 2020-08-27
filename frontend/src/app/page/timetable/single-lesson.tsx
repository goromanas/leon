import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { motion } from 'framer-motion';

import { TeacherModal } from 'app/components/modalContent/teacherModal';
import { StudentModal } from 'app/components/modalContent/studentModal';
import { navigationService } from 'app/service/navigation-service';
import { variantsDay } from 'app/page/timetable/animation';

import { scheduleCalc } from './schedule-calc';

import styles from './lessons.module.scss';
import { lessonInformationService } from 'app/api/service/lessonInformation-service';
import { connectContext, SettingsProps } from 'app/context';

interface OwnProps {
    currentLesson: number;
    thisLesson: any;
    handleOpenClassroom: any;
    schedule: any | null;
    userRole: string[];
    date: string;
    homepage?: boolean;
    ifDayEnded: boolean;
}

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    allLessons: Api.LessonDto[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
    updateLessons:(lessons: Api.LessonDto[]) => void,
}


type Props = ContextProps & OwnProps;



const { lesson, activeLesson, endedLesson, lessonBarContent, lessonBar, lessonBarWithBreak, activeInSchedules, emptyLesson, lessonIcon, lessonLive, activeBorder } = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const [update,setUpdate] = useState(0);
    const { currentLesson, thisLesson, handleOpenClassroom, schedule, userRole, date, homepage, ifDayEnded } = props;
    const [modalVisible, setModalVisible] = useState(false);


    let lessonInformationData:any=null;
    // define classNames
    const lessonClass = classNames(
        lesson,
        // active
        currentLesson === thisLesson.id && moment().format('DDD') === moment(date).format('DDD') && activeLesson,
        !homepage && activeInSchedules,
        // ended
        parseInt(moment().format('DDD'), 10) > parseInt(moment(date).format('DDD'), 10) && endedLesson,
        currentLesson > thisLesson.id && moment().format('DDD') === moment(date).format('DDD') && endedLesson,
        ifDayEnded && date === moment().format('YYYY-MM-DD') && endedLesson,

        // empty lesson
        thisLesson.id === -1 && emptyLesson,
    );
    // console.log(ifDayEnded)
    const checkUserRoleForModal = (): boolean =>
        userRole.includes('STUDENT') || userRole.includes('PARENT');

    const showModal = (index: number) => {
        thisLesson.id !== -1 && setModalVisible(!modalVisible);
        setUpdate(update);
        // console.log(thisLesson.id);
        // for testing purposes
        // console.log(thisLesson.lessonInformation[0]);
    };

    const getLessonInformation= () => {
        let tempInformation = thisLesson.lessonInformation.filter((lesson: Api.LessonInformationDto) => lesson.date === date)
        if (tempInformation.length>0){
            console.log(tempInformation);
          //   lessonInformationData = lessonInformationService.getSingleLessonInformation(tempInformation[0].id);
        }
    }

    const checkLessonInformation = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        checkUserRoleForModal() ? showModal(thisLesson.id) : null;
    };

    const handleOk = () => {
        setModalVisible(!modalVisible);
        props.updateLessons();
    };

    let iconName = thisLesson.subject;
    if (thisLesson.subject && thisLesson.subject.includes(' ')) {
        const arr = thisLesson.subject.split(' ');
        iconName = arr[0];
    }

    const currentLessonInfo = thisLesson.lessonInformation
        .filter((_lesson: Api.LessonInformationDto) => _lesson.date === date)[0];
    return (
        <>
            {getLessonInformation()}
            <Modal
                style={{ borderRadius: '30px', overflow: 'hidden' }}
                className={styles.modal}
                visible={modalVisible}
                footer={null}
                onCancel={handleOk}
                okButtonProps={{
                    children: 'Custom OK',
                }}
            >
                {checkUserRoleForModal() ?
                    (
                        <StudentModal

                            subject={thisLesson.subject}
                            onClose={handleOk}
                            lessonInformation={thisLesson.lessonInformation
                                .filter((lesson: Api.LessonInformationDto) => lesson.date === date)}
                            classId={thisLesson.id}
                            date={date}
                        />
                    ) :
                    (
                        <TeacherModal
                            subject={thisLesson.subject}
                            lessonId={thisLesson.id}
                            onClose={handleOk}
                            date={date}
                            lessonInformation={thisLesson.lessonInformation
                                .filter((_lesson: Api.LessonInformationDto) => _lesson.date === date)}
                        />
                    )
                }
            </Modal>

            <motion.div
                className={lessonClass}
                key={thisLesson.id}
                variants={variantsDay}
            >
                <div className={lessonBar}>
                    <div className={lessonBarWithBreak}>
                        <div className={activeBorder}>
                            <div
                                data-tip={thisLesson.id === -1 ? 'No Lesson' : null}
                                className={lessonBarContent + ' ' + (checkUserRoleForModal() ? styles.pointer : null)}
                                onClick={!thisLesson.lessonInformation[0] && checkUserRoleForModal() ? null : () => showModal(thisLesson.id)}
                                style={{
                                    height: scheduleCalc.getLessonLength(schedule),
                                    cursor: !thisLesson.lessonInformation[0] ? 'default' : 'cursor,',
                                }}
                            > <img
                                    className={lessonIcon}
                                    alt=""
                                    src={`icons/subjects/${iconName}.svg`}
                                />
                                {checkUserRoleForModal() ? <h1>{thisLesson.subject}</h1> :
                                    <h1>{thisLesson.className + ' ' + thisLesson.subject}</h1>}
                                <div className={styles.assignments}>
                                    {
                                        currentLessonInfo?.assignment?.includes('Homework') &&
                                        <img
                                            alt=""
                                            src={`icons/homework.svg`}
                                        />
                                    }
                                    {currentLessonInfo?.assignment?.includes('Test') &&
                                        <img
                                            alt=""
                                            src={`icons/assignment.svg`}
                                        />
                                    }
                                </div>
                                {checkUserRoleForModal() ? null
                                    : <div className={styles.editModal}>
                                        <i className="fas  fa-lg fa-plus-circle" />
                                    </div>}
                                {thisLesson.id === currentLesson && moment().format('W') === moment(date).format('W') ?
                                    (<Link to={navigationService.redirectToVideoChat(currentLesson)}>
                                        {homepage ?

                                            (
                                                <>
                                                    {/* <img
                                                        alt="Lesson camera icon"
                                                        src={'icons/camera.svg'}
                                                    /> */}
                                                    <Button
                                                        type="primary"
                                                        shape="round"
                                                        className={styles.toVideoButton}
                                                    >
                                                        Join a Class
                                                </Button>
                                                </>
                                            )

                                            : (
                                                <div style={{ display: 'flex' }}>
                                                    <img
                                                        className={lessonLive}
                                                        alt="Lesson modal icon"
                                                        src={'icons/camera.svg'}
                                                    /> <span>Live</span>
                                                </div>

                                            )}
                                    </Link>)
                                    : null}
                            </div>
                        </div>
                        {thisLesson.id === -1 && <ReactTooltip />}
                        <span
                            data-tip="Break"
                            style={{ height: scheduleCalc.getBreakTime(schedule, thisLesson.time) }}
                            className={styles.breakSpan}
                        > {
                                scheduleCalc.getBreakTime(schedule, thisLesson.time) > 20 ?
                                    (
                                        <span className={styles.longBreak}>Long break</span>
                                    ) : null
                            }
                        </span>
                        <ReactTooltip />
                    </div>
                </div>
            </motion.div>
        </ >

    );

};

const mapContextToProps = ({ session: { user }, lessons, currentLesson, schedule,actions:{updateLessons} }: SettingsProps): ContextProps => ({

    username: user != null ? user.username : null,
    userRoles: user.roles,
    allLessons: lessons,
    currentLesson,
    schedule,
    updateLessons,
});

const SingleLessonPage = connectContext(mapContextToProps)(SingleLesson);

export { SingleLesson };
