import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Radio, Alert, Button } from 'antd';

import styles from './options.module.scss';

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.

interface Props {
    updateQuiz: any;
}

function validateQuestion(value: any) {
    let error;

    if (value == '') {
        error = 'You must write a question!';
    }
    return error;
}

function checkForDuplicates(array: any) {
    return new Set(array).size !== array.length;
}

const OptionList: React.FC<Props> = (props) => {

    const onChange = (e: any) => {
        setValue(e.target.value);

    };
    const onChangeTimer = (e: any) => {
        setValueTimer(e.target.value);

    };
    const [value, setValue] = React.useState(0);
    const [valueTimer, setValueTimer] = React.useState('15');

    const [questionCount, setQuestionCount] = useState(0);

    return (<div>
        <Formik
            initialValues={{ question: '', options: [], timer: '15' }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                    values.timer = valueTimer;
                    props.updateQuiz(values, value);
                    //   alert(JSON.stringify(values, null, 2));
                }, 400);

                setTimeout(async () => {
                    resetForm();
                    setValueTimer('15');
                    setQuestionCount(0);
                    //   alert(JSON.stringify(values, null, 2));
                }, 1000);
            }}
            render={({ values, validateField, errors }) => (
                <Form className={styles.quizForm}>
                    {errors.question ? <div>{errors.question}</div> : null}
                    {questionCount < 2 ?
                        <Alert message="Please provide at least 2 options" type="warning" closable={true} />

                        : null}
                    {value === 0 ?
                        <Alert message="Please select the corrent answer" type="warning" closable={true} />

                        : null}
                    {checkForDuplicates(values.options) ?
                        <Alert message="All answers must be different" type="warning" closable={true} />

                        : null}
                    <Field name="question"
                        as="textarea"
                        validate={validateQuestion}
                        className={styles.questionField}
                        placeholder="Write your Question"
                        autoComplete="off"
                    />
                    <FieldArray
                        name="options"
                        render={arrayHelpers => (
                            <div>
                                {values.options && values.options.length > 0 ? (
                                    <Radio.Group onChange={onChange} value={value}>

                                        {
                                            values.options.map((option, index) => (

                                                <div key={index}>
                                                    <Radio key={index} value={index + 1}>

                                                        <Field
                                                            name={`options.${index}`}
                                                            className={styles.answerField}
                                                            placeholder="Option"
                                                            fullWidth={true}
                                                        />
                                                        <Button
                                                            onClick={() => (arrayHelpers.remove(index), setQuestionCount(questionCount - 1))}
                                                            className={styles.changeOption}
                                                            shape="circle"
                                                        >
                                                            -
                                                        </Button>
                                                        <Button
                                                            disabled={questionCount == 5 ? true : false}
                                                            onClick={() => (arrayHelpers.insert(index + 1, ''), setQuestionCount(questionCount + 1))}
                                                            className={styles.changeOption}
                                                            shape="circle"
                                                        >
                                                            +
                                                        </Button>
                                                    </Radio>
                                                </div>

                                            ))}
                                    </Radio.Group>) : (
                                        <button type="button"
                                            onClick={() => (arrayHelpers.push(''), setQuestionCount(questionCount + 1))}
                                            className={styles.optionButton}
                                        >
                                            Add an option
                                        </button>
                                    )}



                                <div className={styles.submitContainer}>
                                    <div>
                                        {/* <Field name="timer" as="select" placeholder="Select a time">
                                        <option value="15">15s</option>
                                        <option value="30">30s</option>
                                        <option value="45">45s</option>
                                        <option value="60">1min</option>
                                    </Field> */}
                                        <label className={styles.timerLabel}>Select the duration to answer</label>
                                        <Radio.Group name="timer" onChange={onChangeTimer} value={valueTimer} >
                                            <Radio.Button value="15">15s</Radio.Button>
                                            <Radio.Button value="30">30s</Radio.Button>
                                            <Radio.Button value="40">45s</Radio.Button>
                                            <Radio.Button value="60">1min</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                    <button type="submit"
                                        className={styles.submitButton}
                                        disabled={(errors.question || questionCount < 2 || checkForDuplicates(values.options) || value === 0) ? true : false}
                                        onClick={() => validateField('question')}
                                    >Send your question
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </Form>
            )}
        />
    </div>);
};

export default OptionList;
