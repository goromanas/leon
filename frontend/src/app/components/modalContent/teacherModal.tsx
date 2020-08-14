import React from 'react';
import { Select } from 'antd';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { SelectField } from 'app/components/inputs';

import { FormButton, SubmitButton } from 'app/components/buttons';

import { lessonInformationService } from 'app/api/service/lessonInformation-service';

const {Option} = Select;

interface Values {
    assignment: string[];
    information: string;
    topic: string;
}

const TeacherModal: React.FC<{ subject: string }> = (props) => {
    const saveLessonInformation = (lessonInformation: Api.LessonInformationDto): void => {
        lessonInformationService
            .postLessonInformation(lessonInformation)
            .then(() => console.log(lessonInformation));

        // .updateUser(user)
        // .then(() => navigationService.redirectToUserListPage())
        // .catch(() => message.error('Failure saving user'));
    };
    return (
        <div>
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    assignment: [],
                    information: '',
                    topic: '',
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    saveLessonInformation(values);
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 500);
                }}
            >
                {({setFieldValue}) => (
                    <Form>
                        <label htmlFor="topic">Lesson topic</label>
                        <Field id="topic" name="topic" placeholder="Enter topic for a lesson"/>

                        <label htmlFor="information">Lesson information</label>
                        <Field as="textarea" id="information" name="information"
                               placeholder="Assignments, information, homework, etc."/>

                        <Field
                            component={SelectField}
                            label="Assignments for this lesson:"
                            name="role"
                            placeholder="Please select roles"
                            mode="multiple"
                            onChange={(option: string) => setFieldValue('assignment', option)}
                        >
                            <Option value="TEST">Test</Option>
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
