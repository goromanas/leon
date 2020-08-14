import React, { useState, useEffect, useRef, ReactElement } from 'react';
import classNames from 'classnames';

import { navigationService } from 'app/service/navigation-service';
import { lessonsService } from 'app/api/service/lessons-service';
import { loggerService } from 'app/service/logger-service';

import { TimeLine } from './time-line';
import { SingleLesson } from './single-lesson';

import styles from './lessons.module.scss';
import moment from 'moment';

interface Props {
    lessonsList: Api.Lesson[];
    userRole: string[];
    day?: number;
    date: string;
}

// navigate to video chat by class number id. Passed function in SingleLesson
const handleOpenClassroom = (id: number): void => {
    navigationService.redirectToVideoChat(id);
};

// create new websocket instance
const getSocketUrl = (): string => {
    const loc = window.location;
    let newUrl: string;
    if (loc.host === 'localhost:3000') {
        newUrl = 'ws://localhost:8080/ws/currentLesson';
    } else {
        newUrl = ' wss://java-menuo-su-it.northeurope.cloudapp.azure.com/ws/currentLesson';
    }
    return newUrl;
};

const ws = new WebSocket(getSocketUrl());

const DayLessonsList: React.FC<Props> = ({ lessonsList, userRole, day, date }) => {
    const listRef: React.RefObject<HTMLUListElement> = useRef(null);

    const [currentLesson, setCurrentLesson] = useState<number>(3);
    const [scheduleTimes, setScheduleTimes] = useState<Api.ScheduleDto[]>([]);
    const [loadingSchedules, setLoadingSchedules] = useState<boolean>(true);
    const [listHeight, setListHeight] = useState<number>(0);
    const [breakTimes, setBreakTimes] = useState<any>([]);
    const [dayLength, setDayLength] = useState<number>(0);
    const [dayOfWeek, setDayOfWeek] = useState<number>(0);

    // get schedule times from /schedule
    useEffect(() => {
        const fetch = () => {
            lessonsService.getSchedule()
                .then((data) => setScheduleData(data))
                .then(() => setLoadingSchedules(false))
                .catch(error => {
                    loggerService.error('Error occurred when getting session information', error);
                });
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
        const date = new Date();
        setDayOfWeek(date.getDay());
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            setCurrentLesson(parseInt(evt.data, 10));
            // setCurrentLesson(3);
            // console.log(evt.data)
        };

        ws.onclose = () => {
            console.log('disconnected');
        };
    }, []);

    // set height of current list
    useEffect(() => {
        if (listRef.current && !loadingSchedules) {
            setListHeight(listRef.current.clientHeight);
        }
        setBreakTimes(setBreaks(scheduleTimes));
        console.log(lessonsList);
    }, [scheduleTimes]);

    const convertTimeToMinutes = (time: any) => {
        const hours = parseInt(time.substr(0, 2), 10);
        const minutes = parseInt(time.substr(3, 4), 10);
        return hours * 60 + minutes;
    };

    // create breaks array from schedule times
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

    // loop all lessons and return SingleLesson for each

    const todaysLessons = !day ? lessonsList.filter((item) => item.day === dayOfWeek) : lessonsList;
    const positionInList = (e: any) => todaysLessons.indexOf(e) + 1;
    // const date = new Date();
    const isThisDay = dayOfWeek === day;
    // const isThisDayInList = todaysLessons[0].day === dayOfWeek;
    // find(({ day }) => name === 'cherries');

    const allLessons = todaysLessons.map((item: any) => (
        <div key={item.id}>
            {/* {dayOfWeek} */}
            <SingleLesson
                positionInList={positionInList(item)}
                currentLesson={currentLesson}
                lesson={item}
                handleOpenClassroom={handleOpenClassroom}
                schedule={scheduleTimes[positionInList(item) - 1]}
                userRole={userRole}
                lessons={todaysLessons}
                scheduleTimes={scheduleTimes}
                isThisDay={dayOfWeek === item.day}
                date={date}
            />
            < span style={{ height: breakTimes[positionInList(item) - 1] }} className={styles.breakSpan} />
        </div>
    ));

    const getDayFromInt = (d: number): string => {
        switch (d) {
            case 1:
                return 'Monday';
            case 2:
                return 'Tuesday';
            case 3:
                return 'Wednesday';
            case 4:
                return 'Thursday';
            case 5:
                return 'Friday';
            case 6:
                return 'Saturday';
            case 7:
                return 'Sunday';
            default:
                return 'Nothing';
        }
    };

    const listClass = classNames(
        styles.list,
        // !isThisDay && styles.listOtherDay,
        day && styles.listOtherDay,
        // isThisDay && positionInList < currentLesson && endedLesson,
    );
    return (
        <div>
            {
                !loadingSchedules && breakTimes.length > 0 &&
                (
                    <>
                        {day ? (
                            <h1 className={styles.classListHeader}>{(getDayFromInt(day))} {isThisDay && moment().format('YYYY-MM-DD') === date ? `(today)` : ``}
                                <h3>{date}</h3>
                            </h1>) : <>
                                <h1 className={styles.classListHeader}>Today's lecture ({todaysLessons.length})</h1>
                            </>}

                        {listHeight > 0 && scheduleTimes && !day &&
                            (
                                <TimeLine
                                    scheduleTimes={scheduleTimes}
                                    listHeight={listHeight || 0}
                                    lessonsList={todaysLessons}
                                />
                            )}
                        <ul className={listClass} ref={listRef}>{allLessons}</ul>
                    </>
                )}

        </div>
    );
};

export { DayLessonsList };
