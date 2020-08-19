import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';

// Here is an example of a form with an editable list.
// Next to each input are buttons for insert and remove.
// If the list is empty, there is a button to add an item.
const OptionList = () => (
    <div>
        <h1>Option List</h1>
        <Formik
            initialValues={{question:"aaa",options: ["value"]}}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 400);
            }}
            render={({values}) => (
                <Form>
                    <Field name="question">

                    </Field>
                    <FieldArray
                        name="options"
                        render={arrayHelpers => (
                            <div>
                                {values.options && values.options.length > 0 ? (
                                    values.options.map((option, index) => (
                                        <div key={index}>
                                            <Field name={`options.${index}`}/>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.insert(index+1, '')}
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button type="button" onClick={() => arrayHelpers.push('')}>
                                        Add an option
                                    </button>
                                )}
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </div>
                        )}
                    />
                </Form>
            )}
        />
    </div>
);

export default OptionList;
