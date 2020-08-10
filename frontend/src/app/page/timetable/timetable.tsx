import React from 'react';
import { connectContext, SettingsProps } from 'app/context';

interface ContextProps {
    username: string | null;
    userRoles: string[] | null;
    teacherLessons: Api.Lesson[];
}

type Props = ContextProps;

class TimetablePageComponent extends React.Component<Props> {

    public render(): React.ReactNode {

        const {
            username,
            userRoles,
            teacherLessons,
        } = this.props;

        console.log(teacherLessons);
        return (
            <>
                <p>Timetable page</p>

                {
                   teacherLessons ? teacherLessons.map(lesson =>(
                        <li key={lesson.id}> {lesson.subject} {lesson.teacher} </li>
                    )) : null
                }


            </>);
    }

}

const mapContextToProps = ({ session: { user }, lessons }: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    userRoles: user.roles,
    teacherLessons: lessons,
});

const TimetablePage = connectContext(mapContextToProps)(TimetablePageComponent);

export { TimetablePage };
