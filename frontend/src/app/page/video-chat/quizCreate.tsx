import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Field, Form, Formik, useFormik } from 'formik';
import { Layout, Radio } from 'antd';

import OptionList from './options';

const { Content } = Layout;

interface Props {
    updateQuiz: any;
}

const QuizCreate: React.FC<Props> = (props) => {

    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            question: '',
            answers: [],

        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <>
            <OptionList updateQuiz={props.updateQuiz} />
        </>
    );
};

export { QuizCreate };
