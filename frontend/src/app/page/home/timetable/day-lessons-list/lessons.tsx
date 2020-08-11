import React from 'react';
import { Button } from 'antd';
// @ts-ignore
import Websocket from 'react-websocket';

import { navigationService } from 'app/service/navigation-service';

import styles from './lessons.module.scss';

interface Props {
    lessonsList: Api.Lesson[];
    currentLesson: number;
}

// interface State {
//     currentLesson: number;
// }

class Lessons extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
        // this.state = { currentLesson: 2 };
        // this.handleData = this.handleData.bind(this);
    }

    public render(): React.ReactNode {
        const { lessonsList, currentLesson } = this.props;
        const activeLesson = { backgroundColor: '#636363', color: '#000000' };
        const upcomingLesson = { backgroundColor: '#929292', color: '#000000' };
        const positionInList = (e: any) => lessonsList.indexOf(e) + 1;

        const allLessons = this.props.lessonsList.map((item: any) => (

            <li className={styles.listItem} key={item.id}>
                <div className={styles.classNumber}
                     style={positionInList(item) === currentLesson ? activeLesson
                    : positionInList(item) > currentLesson ? upcomingLesson : null}>
                    {lessonsList.indexOf(item) + 1}.
                </div>
                <div className={styles.listContent}
                     style={positionInList(item) === currentLesson ? activeLesson
                    : positionInList(item) > currentLesson ? upcomingLesson : null}>
                    {item.subject}
                    {positionInList(item)  === currentLesson ? (
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
                <Websocket url="ws://localhost:8080/currentLesson"
                           onMessage={this.handleData}
                           debug={true} />
                <h1 className={styles.classListHeader}>Šiandienos pamokos({lessonsList.length})</h1>
                <ul className={styles.list}>{allLessons}</ul>
            </div>
        );
    }
    private handleData(data: any): void {
        const result = JSON.parse(data);

        this.setState({ currentLesson: result });
        // console.log(result)
    }
    private readonly handleOpenClassroom = (id?: number): void => {
        navigationService.redirectToVideoChat(id);
    };
}

export { Lessons };
