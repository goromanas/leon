import React from 'react';

import { AsyncContent } from 'app/components/layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';

import { Item } from './item/item';

import styles from './to-do-list.module.scss';

interface Props {
    lessons: Api.LessonDto[];
}

const ToDoList: React.FC<Props> = (
    { lessons }) =>

    (
        <AsyncContent
            loading={!lessons === null && lessons.length > 0}
            loader={<PageLoadingSpinner />}
        >
            <div>
                <h4>Tomorrow's to-do list</h4>
                {lessons && lessons.filter(item => item.lessonInformation.length > 0).map((lesson, index) => (
                    <div className={styles.itemWrapper} key={index}>{lesson.lessonInformation.map((assignment, id) => (
                        <Item
                            key={id}
                            lessonSubject={lesson.subject}
                            topic={assignment.topic}
                            type={assignment.assignment}
                        />
                    ))}</div>
                ))}
            </div>
        </AsyncContent>
    );

export { ToDoList };
