import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout, Radio, } from 'antd';
import Jitsi from 'react-jitsi';

import { connectContext, SettingsProps } from 'app/context';
import { PageContent } from 'app/components/layout';
import { navigationService } from 'app/service/navigation-service';
import { Button, Modal } from 'antd';
import { lessonsService } from 'app/api/service/lessons-service';

const {Content} = Layout;

interface Props {
    message: any;
    changeValue: (number: number) => void;
    onSuccess: () => void;
    onCancel: () => void;
    visible: boolean;
}

const AnswerQuiz: React.FC<Props> = (props) => {
    const onChange = (e: any) => {
        // console.log('radio checked', e.target.value);
        props.changeValue(e.target.value);
        setValid(true);

    };
    const onTimer = (counter: number) => {
        if (counter == 0) {
            props.onCancel();
            console.log('test');
        }
    };

    const [valid, setValid] = React.useState(false);
    const [counter, setCounter] = React.useState(props.message.timer);

    React.useEffect(() => {
        if (
            counter >= 0) {
            setTimeout(() => setCounter(counter - 1), 1000);
            if (counter == 0) {
                props.onCancel();
            }
        }
    }, [counter]);

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    return (
        <>

            <h1>{props.message.Question}</h1>

            <Radio.Group onChange={onChange}>

                {props.message.options.map((item: any) =>
                    (
                        <Radio style={radioStyle} key={item.id} value={item.id}>
                            {item.name}
                        </Radio>
                    )
                )}

                <Button
                    disabled={!valid}
                    onClick={() => props.onSuccess()}>
                    Submit
                </Button>

            </Radio.Group>

            {!valid ?
                <h4 style={{color: 'red'}}>Please select an option</h4> :
                null
            }

            <div>Countdown: {counter}</div>

        </>
    );
};

export { AnswerQuiz };
