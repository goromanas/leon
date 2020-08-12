import React, {useState, useEffect} from 'react';
import { Button } from 'antd';
import { navigationService } from 'app/service/navigation-service';
import styles from './lessons.module.scss';

interface Props {
    lessonsList: Api.Lesson[];
}

const [currentLesson, setCurrentLesson] = useState(1)

const activeLesson = { backgroundColor: '#636363', color: '#000000' };
const upcomingLesson = { backgroundColor: '#929292', color: '#000000' };

const handleData = (data: any): void => {
    // const result = JSON.parse(data);
    setCurrentLesson(data);
};

const handleOpenClassroom = (id?: number): void => {
    navigationService.redirectToVideoChat(id);
};

const Lessons: React.FC<Props> = ({lessonsList}) => {
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
                {positionInList(item) === currentLesson ? (
                    <Button
                        type="primary"
                        className={styles.toVideoButton}
                        onClick={() => handleOpenClassroom(item.id)}
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
            <ul className={styles.list}>{allLessons}</ul>
        </div>
    )
}

export { Lessons };
