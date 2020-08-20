import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Layout, Radio, Progress } from 'antd';

const {Content} = Layout;

interface Props {
    answers: any;
    correct: number;
}

const QuizResult: React.FC<Props> = (props) => {

    const [progress, setProgress] = useState(0);
    const calculate = () =>
        props.answers.filter((item: any) => item.answer === props.correct).length / props.answers.length * 100;
    return (
        <>
            <Progress percent={calculate()}
                      strokeColor={{
                          from: '#00ff00',
                          to: '#00ff00',
                      }}
                      trailColor={'#ff0000'}
                      strokeWidth={25}
            ></Progress>

            <ol>
                <li>
                    Correct {props.answers.filter((item: any) => item.answer === props.correct).length}
                </li>
                <li>
                    Incorrect {props.answers.length - props.answers.filter((item: any) => item.answer === props.correct).length}
                </li>
            </ol>

            {calculate()}
            {props.answers.map((item: any) =>
                (
                    <h1 key={item.index}>{item.answer}</h1>
                ),
            )}
        </>
    );
};

export { QuizResult };
