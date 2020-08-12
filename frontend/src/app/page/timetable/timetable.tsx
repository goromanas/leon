import React from 'react';

import { connectContext, SettingsProps } from 'app/context';
import { Lessons } from 'app/page/home/timetable/day-lessons-list/lessons';

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
}

type Props = ContextProps;

class TimetablePageComponent extends React.Component<Props> {

    public lesson: Api.Lesson[];

    private sortedLesson: Api.Lesson[];

    public render(): React.ReactNode {

        const {
            username,
            userRoles,
            teacherLessons,
        } = this.props;

        this.somefunction(teacherLessons);

        return (
            <>

                <Lessons lessonsList={this.somefunction(teacherLessons) || []} />
                <p>Timetable page</p>

                {
                   teacherLessons ? teacherLessons.map(lesson => (
                        <li key={lesson.id}> {lesson.subject} {lesson.teacher} </li>
                    )) : null
                }

            </>);
    }
    public somefunction(teacherLessons: Api.Lesson[]): Api.Lesson[] {

        if (teacherLessons != null) {
            this.sortedLesson = teacherLessons.sort((n1, n2) => n1.time - n2.time);
            for (let i = 1; i < 7; i++) {

            return this.sortedLesson.filter(lesson => lesson.time == i ? lesson : null);
        }
        }}

}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
});

const TimetablePage = connectContext(mapContextToProps)(TimetablePageComponent);

export { TimetablePage };
