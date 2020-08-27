import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Field, Form, Formik, useFormik } from 'formik';
import { Layout, Radio } from 'antd';

import OptionList from './options';

const {Content} = Layout;

interface Props {
    updateQuiz: any;
}

const QuizCreate: React.FC<Props> = (props) => {
    return (
        <>
            <OptionList updateQuiz={props.updateQuiz}/>
        </>
    );
};

export { QuizCreate };
