import React from 'react';
import { Layout, Radio, Button } from 'antd';

import styles from './answerQuiz.module.scss';


interface Props {
    message: any;
    changeValue: (number: number) => void;
    onSuccess: () => void;
    onCancel: () => void;
    visible: boolean;
}

const AnswerQuiz: React.FC<Props> = (props) => {
    const onChange = (e: any) => {
        setValue(e.target.value);
        // console.log('radio checked', e.target.value);
        props.changeValue(e.target.value);
        setValid(true);

    };

    const [valid, setValid] = React.useState(false);
    const [counter, setCounter] = React.useState(props.message.timer);
    const [value, setValue] = React.useState(0);
    React.useEffect(() => {
        if (
            counter >= 0) {
            setTimeout(() => setCounter(counter - 1), 1000);
            if (counter == 0) {
                props.onSuccess();
            }
        }
    }, [counter]);

    // const radioStyle = {
    //     display: 'block',
    //     height: '30px',
    //     lineHeight: '50px',
    // };

    return (
        <>

            <h1
                className={styles.questionTitle}
            >
                {props.message.question}
            </h1>

            <Radio.Group onChange={onChange} value={value} style={{width: "100%", marginTop: "2rem"}}>

                {
                    props.message.options.map((item: any) =>
                        (<div className={styles.optionWrapper}>
                            <Radio  key={item.id} value={item.id} className={styles.answerOption}>
                                {item.name}
                            </Radio>
                        </div>
                        ),
                    )}

            </Radio.Group>
{/*
            {!valid ?
                <h4 style={{color: 'red'}}>Please select an option</h4> :
                null
            } */}

            <div className={styles.submitContainer}>
                <div>
                Time left: {' '}
                <span className={styles.counter}>
                    {counter}s
                    </span>
                    </div>
            <Button
                    type="primary"
                    disabled={!valid}
                    onClick={() => props.onSuccess()}>
                    Submit Your Answer
            </Button>
            </div>

        </>
    );
};

export { AnswerQuiz };
