import React, { useState } from 'react';

import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';

import { Item } from './item/item';

import styles from './to-do-list.module.scss';

interface Props {
    lessons: Api.LessonDto[];
    userRole: string[] | null;
}

const getDayOfTheWeek = (day: string): string => {
    switch (new Date(day).getDay()) {
        case 0:
            return 'Sunday';

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
    }
};

const checkIfTomorrow = (day: Date): boolean => {
    const tomorrow = new Date();
    const today = new Date(day);
    tomorrow.setDate(new Date().getDate() + 1);

    if (tomorrow.getFullYear() === today.getFullYear() &&
        tomorrow.getMonth() === today.getMonth() &&
        tomorrow.getDate() === today.getDate()) {
        return true;
    } else {
        return false;
    }
};

const currentDate = new Date();

const ToDoList: React.FC<Props> = (props) => {
    const { lessons, userRole } = props;

    let recentDate: string;

    const checkIfrecent = (day: string): any => {
        if (day !== recentDate) {
            recentDate = day;
            if (checkIfTomorrow(new Date(day))) {
                return (
                    <h4 key={day}>Tomorrow</h4>
                );
            } else {
                return (
                    <h4 key={day}>{getDayOfTheWeek(day)}</h4>
                );
            }
        }
    };

    return (
        <AsyncContent
            loading={!lessons === null && lessons.length > 0}
            loader={<PageLoadingSpinner />}
        >
            <div>
                {lessons && lessons
                    .filter(item => item.lessonInformation.length > 0)
                    .map((lesson, index) => (
                        <div key={index} >
                            {lesson.lessonInformation
                                .map((assignment, id) => (
                                    <>
                                        {new Date(assignment.date) > currentDate
                                            ?
                                            checkIfrecent(assignment.date)
                                            : ''}
                                        {new Date(assignment.date) > currentDate ? (
                                            <div key={id} className={styles.itemWrapper}>
                                                <Item
                                                    key={id}
                                                    lessonSubject={lesson.subject}
                                                    topic={assignment.topic}
                                                    type={assignment.assignment}
                                                    information={assignment.information}
                                                    userRole={userRole}
                                                    date={assignment.date}
                                                />
                                            </div>
                                        ) : ''}
                                    </>
                                ))}</div>
                    ))}
            </div>
        </AsyncContent >
    );
};

export { ToDoList };
