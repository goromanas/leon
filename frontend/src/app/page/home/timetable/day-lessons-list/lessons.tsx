import React from 'react';

import styles from './lessons.module.scss';
import { Button } from 'antd';
import { navigationService } from 'app/service/navigation-service';
import lessonTimes from '../lesson-times-data.json';

const l = lessonTimes as SingleLessonTimes[];

interface Props {
    lessonsList: Api.Lesson[];
}
interface State {
    date: Date;
    lessonsState: Api.Lesson[];
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
        this.state = { date: new Date(), lessonsState: this.props.lessonsList};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        this.updateLessonsStatus = this.updateLessonsStatus.bind(this);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    updateLessonsStatus = () => {
        let currentLesson: number;
        currentLesson = lessonTimes.forEach(item => {
            if (item.startTime >= this.state.date.getHours() && this.state.date.getHours() <= item.endTime) {
                return item.id;
            } else {
                return null;
            }
        });

        return this.state.lessonsState.map(item => {
            if (item.id + 1 === currentLesson) {
                item.status = 1;
            } else if (item.id + 1 < currentLesson) {
                item.status = 0;
            } else if (item.id + 1 > currentLesson) {
                item.status = 2;
            }
            return item;
        });
    };

    tick() {
        this.setState({ date: new Date(), lessonsState: this.updateLessonsStatus() });
    }

    public render(): React.ReactNode {
        const { lessonsList } = this.props;
        const activeLesson = { backgroundColor: '#636363', color: '#000000' };
        const upcomingLesson = { backgroundColor: '#929292', color: '#000000' };

        const allLessons = lessonsList.map((item) => (
            <li className={styles.listItem} key={item.id}>
                <div className={styles.classNumber} style={item.status === 1 ? activeLesson : item.status === 2 ? upcomingLesson : null}>
                    {lessonsList.indexOf(item) + 1}.
                </div>
                <div className={styles.listContent} style={item.status === 1 ? activeLesson : item.status === 2 ? upcomingLesson : null}>
                    {item.subject}
                    {item.status === 1 ? (
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
                <h1 className={styles.classListHeader}>Šiandienos pamokos({lessonsList.length})</h1>
                It is {this.state.date.toLocaleTimeString()}
                <ul className={styles.list}>{allLessons}</ul>
            </div>
        );
    }
    private readonly handleOpenClassroom = (id?: number): void => {
        navigationService.redirectToVideoChat(id);
    };
}
setInterval(Lessons, 1000);

export { Lessons };
