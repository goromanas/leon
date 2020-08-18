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
    answers: any;
}

const QuizResult: React.FC<Props> = (props) => {

    return (
        <>
                {props.answers.map((item: any) =>
                    (
                        <h1 key={item.index}>vote</h1>
                    )
                )}

        </>
    );
};

export { QuizResult };
