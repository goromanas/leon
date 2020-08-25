import React from 'react';

import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';

import { Item } from './item/item';

import styles from './to-do-list.module.scss';

interface Props {
    lessons: Api.LessonDto[];
    userRole: string[] | null;
}

const today = new Date();
const ToDoList: React.FC<Props> = (
    { lessons, userRole }) =>

    (
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
                                        <h4>t</h4>
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
                                    </>
                                ))}</div>
                    ))}
            </div>
        </AsyncContent>
    );

export { ToDoList };
