import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Field, Form, Formik, useFormik } from 'formik';

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

const QuizCreate: React.FC<Props> = (props) => {

        // Pass the useFormik() hook initial form values and a submit function that will
        // be called when the form is submitted
        const formik = useFormik({
            initialValues: {
                question: '',
                answers:[],

            },
            onSubmit: values => {
                alert(JSON.stringify(values, null, 2));
            },
        });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="question">Question</label>
                <input
                    id="question"
                    name="question"
                    type="question"
                    onChange={formik.handleChange}
                    value={formik.values.question}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export { QuizCreate };
