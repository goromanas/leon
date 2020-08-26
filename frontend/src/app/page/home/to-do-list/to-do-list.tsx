import React, { useState } from 'react';
import { assign } from 'lodash';

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
            return 'Sunday\'s to do list';

        case 1:
            return 'Monday\'s to do list';

        case 2:
            return 'Tuesday\'s to do list';

        case 3:
            return 'Wednesday\'s to do list';

        case 4:
            return 'Thursday\'s to do list';

        case 5:
            return 'Friday\'s to do list';

        case 6:
            return 'Saturday\'s to do list';
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

    const checkIfrecent = (day: string, id: number): any => {
        if (day !== recentDate) {
            recentDate = day;
            if (checkIfTomorrow(new Date(day))) {
                return (
                    <h4 key={id.toString() + day.toString()}>Tomorrow's to do list</h4>
                );
            } else {
                return (
                    <h4 className={styles.daytitle} key={id.toString() + day.toString()}>{getDayOfTheWeek(day)}</h4>
                );
            }
        }
    };

    const weekFromNow = (day: string): boolean => {
        const checkDay = new Date();
        const newDate = new Date(day);
        checkDay.setDate(new Date().getDate() + 5);

        if (newDate < checkDay) {
            return true;
        } else {
            return false;
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
                        <div key={lesson.id}>
                            {lesson.lessonInformation
                                // .sort((a, b) => a.date < b.date ? 1 : -1)
                                .filter(item => weekFromNow(item.date))
                                .filter(item => index < 7)
                                .map((assignment, id) => (
                                    <>
                                        {new Date(assignment.date) > currentDate
                                            ?
                                            checkIfrecent(assignment.date, assignment.id)
                                            : ''}
                                        {new Date(assignment.date) > currentDate ? (
                                            <div key={assignment.id} className={styles.itemWrapper}>
                                                <Item
                                                    key={id.toString() + assignment.date.toString()}
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
