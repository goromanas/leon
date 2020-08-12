import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { navigationService } from 'app/service/navigation-service';
import { lessonsService } from 'app/api/service/lessons-service';
import { loggerService } from 'app/service/logger-service';

import { SingleLesson } from './single-lesson';

import styles from './lessons.module.scss';

interface Props {
    lessonsList: Api.Lesson[];
}
interface DayTimes {
    startTime: number;
    endTime: number;
}

// navigate to video chat by class number id. Passed function in SingleLesson
const handleOpenClassroom = (id: number): void => {
    navigationService.redirectToVideoChat(id);
};

// create new websocket instance
const ws = new WebSocket('ws://localhost:8080/currentLesson');

const DayLessonsList: React.FC<Props> = ({ lessonsList }) => {
    const [currentLesson, setCurrentLesson] = useState<number>(0);
    const [scheduleTimes, setScheduleTimes] = useState<Api.ScheduleDto[]>([]);
    const [loadingSchedules, setLoadingSchedules] = useState<boolean>(true);
    const [listHeight, setListHeight] = useState<number>(0);
    const [startEndDay, setStartEndDay] = useState<DayTimes>({
        startTime: 0,
        endTime: 0,
    });
    const [lineTop, setLineTop] = useState(0);
    const [clock, setClock] = useState<Date>(new Date());
    const [currentTime, setCurrentTime] = useState<number>(0);
    const listRef = useRef(null);
    const positionInList = (e: any) => lessonsList.indexOf(e) + 1;

    // get schedule times from /schedule
    useEffect(() => {
        const fetch = () => {
            lessonsService.getSchedule()
                .then((data) => setScheduleTimes(data))
                .then(() => setLoadingSchedules(false))
                // .then(() => setDayTimes())
                .catch(error => { loggerService.error('Error occurred when getting session information', error); });
        };
        fetch();
    }, []);
    useEffect(() => {
        scheduleTimes.length > 0 &&
            setDayTimes();
    }, [clock]);
    // connect to websocect to get curentLesson
    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected');
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            // setCurrentLesson(parseInt(evt.data, 10));
            setCurrentLesson(3);
        };

        ws.onclose = () => {
            console.log('disconnected');
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClock(new Date());
            (currentLesson !== 0) ?
                setListHeight(listRef.current.clientHeight) : setListHeight(0);
            time !== null && setCurrentTime(convertTimeToMinutes(time));
            // currentLesson !== 0 && setDayTimes();
            console.log('end: ' + startEndDay.endTime + 'height: ' + listHeight + 'currentT: ' + currentTime + 'lineTop: ' + lineTop);
        }, 1000);
        return () => clearTimeout(timer);
    }, [clock]);

    useEffect(() => {
        listHeight > 0 &&
            setLineTop((listHeight / startEndDay.endTime) * currentTime);
    }, [listHeight]);

    const time = clock.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
    const convertTimeToMinutes = (time: any) => {
        const hours = parseInt(time.substr(0, 2), 10);
        const minutes = parseInt(time.substr(3, 4), 10);
        return hours * 60 + minutes;
    };
    const setDayTimes = () => {
        const startTime = scheduleTimes[0].startTime;
        const endTime = scheduleTimes[lessonsList.length].endTime;
        setStartEndDay({
            startTime: convertTimeToMinutes(startTime),
            endTime: convertTimeToMinutes(endTime),
        });
    };
    const allLessons = lessonsList.map((item: any) => (

        <SingleLesson
            positionInList={positionInList(item)}
            currentLesson={currentLesson}
            lesson={item}
            key={item.id}
            handleOpenClassroom={handleOpenClassroom}
            schedule={scheduleTimes[positionInList(item)]}
        />

    ));

    return (
        !loadingSchedules &&
        (<div>
            <h1 className={styles.classListHeader}>Today's lecture ({lessonsList.length})</h1>
            {(startEndDay.startTime < currentTime && currentTime < startEndDay.endTime) &&
                <span className={styles.timeLine} style={{ top: lineTop }}>{time}-------</span>
            }

            <ul className={styles.list} ref={listRef}>{allLessons}</ul>

        </div >)
    );
};

export { DayLessonsList };
