import React from 'react';
import { Select } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { SelectField } from 'app/components/inputs';

import { FormButton, SubmitButton } from 'app/components/buttons';

import { lessonInformationService } from 'app/api/service/lessonInformation-service';
import styles from './teacherModal.module.scss';

const {Option} = Select;

interface Values {
    assignment: string[];
    information: string;
    topic: string;
    lessonId: number;
    date: string;
    id: number;
}

const TeacherModal: React.FC<{ lessonId: number, onClose: () => void }> = (props) => {

    const saveLessonInformation = (lessonInformation: Api.LessonInformationDto): void => {
        lessonInformationService
            .postLessonInformation(lessonInformation)
            .then(() => console.log(lessonInformation));

        // .updateUser(user)
        // .then(() => navigationService.redirectToUserListPage())
        // .catch(() => message.error('Failure saving user'));
    };
    return (
        <div className={styles.teacherModal}>
            <h1>Edit lesson info</h1>
            <Formik
                initialValues={{
                    assignment: [],
                    information: '',
                    topic: '',
                    id: 0,
                    lessonId: props.lessonId,
                    date: '2020-08-14',
                }}
                onSubmit={(
                    values: Api.LessonInformationDto,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    console.log(values);
                    saveLessonInformation(values);
                    setTimeout(() => {
                        setSubmitting(false);
                        props.onClose();
                    }, 500);

                }}
            >
                {({setFieldValue}) => (
                    <Form className={styles.teacherModal}>

                        <label htmlFor="topic">Lesson topic</label>
                        <Field id="topic" name="topic" placeholder="Enter topic for this lesson"/>


                        <label htmlFor="information">Lesson information</label>
                        <Field as="textarea" id="information" name="information"
                               placeholder="Assignments, information, homework, etc."/>

                        <Field
                            component={SelectField}
                            name="assignment"
                            placeholder="Please select assignments for this lesson"
                            mode="multiple"
                            onChange={(option: string) => setFieldValue('assignment', option)}
                        >
                            <Option value="Test">Test</Option>
                            <Option value="Homework">Homework</Option>
                            <Option value="Exam">Exam</Option>
                            <Option value="Presentation">Presentation</Option>
                            <Option value="Project">Project</Option>
                        </Field>

                        <FormButton component={SubmitButton}>Save</FormButton>
                    </Form>)}
            </Formik>
        </div>

    );

};

export { TeacherModal };
