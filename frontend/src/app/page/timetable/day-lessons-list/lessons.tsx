import React from 'react';
import { Button, Switch } from 'antd';

import { navigationService } from 'app/service/navigation-service';

import styles from './lessons.module.scss';

const lessonTimes: LessonTimes = [{
    id: 1,
    startTime: 8,
    endTime: 9,
},
{
    id: 2,
    startTime: 10,
    endTime: 11,
},
{
    id: 3,
    startTime: 12,
    endTime: 13,
},
{
    id: 4,
    startTime: 14,
    endTime: 15,
},
{
    id: 5,
    startTime: 16,
    endTime: 17,
}];

interface Props {
    lessonsList: Api.Lesson[];
    day: number;
    time: String;
}

interface State {
    date: Date;
    currentLesson: SingleLessonTimes;
}

interface SingleLessonTimes {
    id: number;
    startTime: number;
    endTime: number;
}

type LessonTimes = SingleLessonTimes[];

class Lessons extends React.Component<Props, State, LessonTimes> {
    private timerID: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            date: new Date(), currentLesson: {
                id: 0,
                startTime: 0,
                endTime: 0,
            }
        };
    }
    public getDayFromInt(day: number): string {
        switch (day) {
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
    }

    public componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000,
        );
        this.updateCurrentLesson = this.updateCurrentLesson.bind(this);
    }

    public componentWillUnmount() {
        clearInterval(this.timerID);
    }

    public updateCurrentLesson() {
        if (this.state.date.getHours() < lessonTimes[lessonTimes.length - 1].endTime) {
            return lessonTimes.find((item: SingleLessonTimes) =>
                item.startTime <= this.state.date.getHours() && item.endTime >= this.state.date.getHours());
        } else { return this.state.currentLesson; }

    }

    public tick() {
        this.setState({ date: new Date(), currentLesson: this.updateCurrentLesson() });
    }

    public render(): React.ReactNode {
        const { lessonsList, day } = this.props;
        const activeLesson = { backgroundColor: '#636363', color: '#000000' };
        const upcomingLesson = { backgroundColor: '#929292', color: '#000000' };
        const lessonInList = (e: any) => lessonsList.indexOf(e) + 1;

        const allLessons = this.props.lessonsList.map((item: any) => (

            <li className={styles.listItem} key={item.id}>
                <div className={styles.classNumber}
                    style={lessonInList(item) === this.state.currentLesson.id ? activeLesson
                        : lessonInList(item) > this.state.currentLesson.id ? upcomingLesson : null}>
                    {lessonsList.indexOf(item) + 1}.
                </div>
                <div className={styles.listContent}
                    style={lessonInList(item) === this.state.currentLesson.id ? activeLesson
                        : lessonInList(item) > this.state.currentLesson.id ? upcomingLesson : null}>
                    {item.subject}
                    {lessonInList(item) === this.state.currentLesson.id ? (
                        <Button
                            type="primary"
                            className={styles.toVideoButton}
                            onClick={() => this.handleOpenClassroom(item.id)}
                        >
                            Prisijungti į pamoką
                        </Button>
                    ) : null}
                </div>
            </li>
        ));

        return (
            <div>
                <h1 className={styles.classListHeader}>{(this.getDayFromInt(day))}</h1>
                <ul className={styles.list}>{allLessons}</ul>
            </div>
        );
    }
    private readonly handleOpenClassroom = (id?: number): void => {
        navigationService.redirectToVideoChat(id);
    };
    // public setInterval(() => tick(), 1000;)

}

export { Lessons };
