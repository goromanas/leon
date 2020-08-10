import React from 'react';
import { Button } from 'antd';

import styles from './lessons.module.scss';
import { navigationService } from 'app/service/navigation-service';
import lessonTimes from '../lesson-times-data.json';

interface Props {
    lessonsList: Api.Lesson[];
}
interface State {

        date: Date,
        lessonsState: Api.Lesson[]
}

class Lessons extends React.Component<Props, State> {
    private timerID: any;

    constructor(props: Props) {
        super(props);
        this.state = { date: new Date(), lessonsState:this.props.lessonsList};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
        // this.setState({date: new Date(), lessonsState: this.props.lessonsList})
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
        // console.log(lessonTimes[1]['start-time']);
    };

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
                <h1 className ={styles.classListHeader}>Šiandienos pamokos({lessonsList.length})</h1>
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
