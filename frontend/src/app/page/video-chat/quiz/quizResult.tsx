import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Layout, Radio, Progress, Badge } from 'antd';
import { motion } from 'framer-motion';

import { variantsUsersList, variantsUser } from 'app/page/timetable/animation';
import styles from './quizResult.module.scss';
import { DownOutlined } from '@ant-design/icons';

const { Content } = Layout;

interface Props {
    answers: any;
    correct: number;
    question: string;
    isOpen: boolean;
}

const QuizResult: React.FC<Props> = (props) => {

    const [progress, setProgress] = useState(0);
    const calculate = () =>
        props.answers.filter((item: any) => item.answer === props.correct).length / props.answers.length * 100;
    return (
        <motion.div
            initial={false}
            animate={props.isOpen ? 'open' : 'closed'}
            variants={variantsUsersList}
            className={props.isOpen ? styles.quizResult : styles.quizResultclosed}

        >
            <motion.div
                variants={variantsUser}
            >
                <div className={styles.quizResulttop}>
                    <h4>Students replied:</h4>
                    <Progress
                        strokeColor="#5B97FC"
                        strokeWidth={20}
                        showInfo={false}
                        percent={16 / 20 * 100}
                        strokeLinecap="square"
                    />
                    <p>16/20</p>
                    <span>Time remaining: </span><span className={styles.time}>10s</span>
                </div>
                <h4>Student's answers</h4>
                <Progress
                    percent={calculate()}
                    strokeColor={{
                        from: '#00ff00',
                        to: '#00ff00',
                    }}
                    trailColor={'#ff0000'}
                    strokeWidth={20}
                    showInfo={false}
                    strokeLinecap="square"
                />

                <div className={styles.replywrapper}>
                    <div className={styles.badgewrapper}>
                        <div className={styles.badge}>
                            <Badge color="green" text="Correct:" />
                        </div>
                        <span>
                            {props.answers.filter((item: any) => item.answer === props.correct).length}

                            <DownOutlined />
                        </span>
                    </div>
                    <div className={styles.badgewrapper}>
                        <div className={styles.badge}>
                            <Badge color="red" text="Wrong:" />
                        </div>
                        <span>
                            {props.answers.length - props.answers.filter((item: any) => item.answer === props.correct).length}

                            <DownOutlined />
                        </span>
                    </div>
                </div>

                <div className={styles.questionwrapper}>
                    <h3>Your question:</h3>
                    <p className={styles.question}>{props.question}</p>
                </div>

                {/*{calculate()}*/}
                {/*{props.answers.map((item: any) =>*/}
                {/*    (*/}
                {/*        <h1 key={item.index}>{item.answer}</h1>*/}
                {/*    ),*/}
                {/*)}*/}
            </motion.div>
        </motion.div >
    );
};

export { QuizResult };