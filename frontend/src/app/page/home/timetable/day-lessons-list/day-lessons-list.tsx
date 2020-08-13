import React, { useState, useEffect, useRef, ReactElement } from 'react';

import { navigationService } from 'app/service/navigation-service';
import { lessonsService } from 'app/api/service/lessons-service';
import { loggerService } from 'app/service/logger-service';

import { TimeLine } from './time-line';
import { SingleLesson } from './single-lesson';

import styles from './lessons.module.scss';

interface Props {
    lessonsList: Api.Lesson[];
    userRole: string[];
}

// navigate to video chat by class number id. Passed function in SingleLesson
const handleOpenClassroom = (id: number): void => {
    navigationService.redirectToVideoChat(id);
};

// create new websocket instance
const ws = new WebSocket('ws://localhost:8080/currentLesson');

const DayLessonsList: React.FC<Props> = ({ lessonsList, userRole }) => {
    const listRef: React.RefObject<HTMLUListElement> = useRef(null);

    const [currentLesson, setCurrentLesson] = useState<number>(0);
    const [scheduleTimes, setScheduleTimes] = useState<Api.ScheduleDto[]>([]);
    const [loadingSchedules, setLoadingSchedules] = useState<boolean>(true);
    const [listHeight, setListHeight] = useState<number>(0);
    const [breakTimes, setBreakTimes] = useState<any>([]);
    const [dayLength, setDayLength] = useState<number>(0);

    const positionInList = (e: any) => lessonsList.indexOf(e) + 1;

    // get schedule times from /schedule
    useEffect(() => {
        const fetch = () => {
            lessonsService.getSchedule()
                .then((data) => setScheduleData(data))
                .then(() => setLoadingSchedules(false))
                .catch(error => { loggerService.error('Error occurred when getting session information', error); });
        };

        fetch();
    }, [lessonsList]);

    const setScheduleData = (data: Api.ScheduleDto[]) => {
        setScheduleTimes(data);
        setDayLength((convertTimeToMinutes(data[lessonsList.length].endTime)
            - convertTimeToMinutes(data[0].startTime)));
    };

    // connect to websocect to get curentLesson
    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            // console.log('connected');
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            setCurrentLesson(parseInt(evt.data, 10));
            // setCurrentLesson(3);
            // console.log(evt.data)
        };

        ws.onclose = () => {
            // console.log('disconnected');
        };
    }, []);

    // set height of current list
    useEffect(() => {
        if (listRef.current && !loadingSchedules) {
            setListHeight(listRef.current.clientHeight);
        }
        setBreakTimes(setBreaks(scheduleTimes));
    }, [scheduleTimes]);

    const convertTimeToMinutes = (time: any) => {
        const hours = parseInt(time.substr(0, 2), 10);
        const minutes = parseInt(time.substr(3, 4), 10);
        return hours * 60 + minutes;
    };

    const setBreaks = (schedule: any) => {
        const breaks: any = [];
        const starts = schedule.map((item: any) => item.startTime);
        const ends = schedule.map((item: any) => item.endTime);

        for (let i: number = 1; i < schedule.length; i++) {
            const breakStartMinutes = convertTimeToMinutes(ends[i - 1]);
            const breakEndMinutes = convertTimeToMinutes(starts[i]);
            breaks.push({ startTime: breakStartMinutes, endTime: breakEndMinutes });
        }
        const breakTimes: number[] = breaks.map((item: any) => item.endTime - item.startTime);
        return breakTimes;
    };

    const allLessons = lessonsList.map((item: any) => (
        <div key={item.id}>
            <SingleLesson
                positionInList={positionInList(item)}
                currentLesson={currentLesson}
                lesson={item}
                handleOpenClassroom={handleOpenClassroom}
                schedule={scheduleTimes[positionInList(item) - 1]}
                userRole={userRole}
            />
            < span style={{ height: breakTimes[positionInList(item) - 1] }} className={styles.breakSpan} />
        </div>

    ));

    return (
        <div>
            {
                !loadingSchedules && breakTimes.length > 0 &&
                (
                    <>
                        <h1 className={styles.classListHeader}>Today's lecture ({lessonsList.length})</h1>
                        {listHeight > 0 && scheduleTimes && currentLesson &&
                            (
                                <>
                                    <TimeLine
                                        scheduleTimes={scheduleTimes}
                                        listHeight={listHeight || 0}
                                        lessonsList={lessonsList}
                                    />
                                </>
                            )}
                        <ul className={styles.list} ref={listRef}>{allLessons}</ul>
                    </>
                )}

        </div >
    );
};

export { DayLessonsList };
