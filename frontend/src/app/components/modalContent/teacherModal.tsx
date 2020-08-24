import React from 'react';
import { Select } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';

import { SelectField } from 'app/components/inputs';
import { FormButton, SubmitButton } from 'app/components/buttons';
import { lessonInformationService } from 'app/api/service/lessonInformation-service';

import styles from './teacherModal.module.scss';

const { Option } = Select;

interface Values {
    assignment: string[];
    information: string;
    topic: string;
    lessonId: number;
    date: string;
    id: number;
}

const TeacherModal: React.FC<{ lessonId: number, onClose: () => void, date: string, subject?: string, lessonInformation?: any }> = (props) => {

    const saveLessonInformation = (lessonInformation: Api.LessonInformationDto): void => {
        lessonInformationService
            .postLessonInformation(lessonInformation);
    };

    const updateLessonInformation = (lessonInformation: Api.LessonInformationDto): void => {
        lessonInformationService
            .updateLessonInformation(lessonInformation);
    };

    const saveInformation = (lessonInformation: Api.LessonInformationDto): void => {
        updateLessonInformation(lessonInformation);
    };
    return (
        <div>
            <Formik
                initialValues={{
                    assignment: props.lessonInformation[0] && props.lessonInformation[0].assignment,
                    information: props.lessonInformation[0] ? props.lessonInformation[0].information : '',
                    topic: props.lessonInformation[0] ? props.lessonInformation[0].topic : '',
                    id: props.lessonInformation[0] ? props.lessonInformation[0].id : 0,
                    lessonId: props.lessonId,
                    date: props.date,
                }}
                onSubmit={(
                    values: Api.LessonInformationDto,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    saveInformation(values);
                    setTimeout(() => {
                        setSubmitting(false);
                        props.onClose();
                    }, 500);

                }}
            >
                {({ setFieldValue }) => (
                    <Form className={styles.teacherModal}>
                        <div className={styles.circle}>
                            <img
                                alt="Lesson modal icon"
                                src={'icons/science.svg'}
                            />
                        </div>
                        <div className={styles.modalTop}>
                            <p>{props.subject}</p>
                            <Field id="topic" name="topic" placeholder="Enter topic for this lesson" />

                        </div>
                        <div className={styles.textareaModal}>
                            <label htmlFor='information'><h3>Homework</h3></label>
                            <Field as="textarea" id="information" name="information"
                                placeholder="Assignments, information, homework, etc." />
                        </div>
                        <div className={styles.selectorField}>
                            <Field

                                component={SelectField}
                                name="assignment"
                                placeholder="Please select assignments for this lesson"
                                mode="multiple"
                                onChange={(option: string) => setFieldValue('assignment', option)}
                            >
                                <Option value="Test">Test</Option>
                                <Option value="Homework">Homework</Option>
                            </Field>
                        </div>
                        <FormButton
                            component={SubmitButton}>{props.lessonInformation[0] ? 'Update' : 'Save'}</FormButton>
                    </Form>)}
            </Formik>
        </div>

    );

};

export { TeacherModal };
