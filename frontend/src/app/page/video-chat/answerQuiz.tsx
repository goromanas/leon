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
    onClose: () => void;
}

const AnswerQuiz: React.FC<Props> = (props) => {
    const onChange = (e) => {
        // console.log('radio checked', e.target.value);
        props.changeValue(e.target.value);

    };
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
                    onClick={()=>props.onClose()}>
                    yayks
                </Button>
            </Radio.Group>

        </>
    );
};

export { AnswerQuiz };
