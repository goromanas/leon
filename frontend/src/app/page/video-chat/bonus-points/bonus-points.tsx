import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import styles from './bonus-points.module.scss';
import { Radio } from 'antd';

const BonusPoints: React.FC = () => {

    interface Values {
        picked: string;
    }

    const optionsWithDisabled = [
        {label: 0.5, value: 0.5, disabled: false},
        {label: 1, value: 1, disabled: false},
        {label: 2, value: 2, disabled: false},
    ];
    const [points, setPoints] = useState(null);
    const radioPoints = (e: any) => {
        console.log(e.target.value);
        setPoints(e.target.value);
    };
    return (
        <div className={styles.bonusPoints}>
            <p style={{textAlign: 'center', fontSize: '12px'}}>Send
                points for most active students!</p>
            <Formik
                initialValues={{
                    picked: '',
                }}
                onSubmit={(
                    values: Values,
                    {setSubmitting}: FormikHelpers<Values>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(points, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >{({values}) => (
                <Form>
                    <div role="group" style={{display: 'flex', flexDirection: 'column'}}>
                        Select points
                        <Radio.Group
                            options={optionsWithDisabled}
                            onChange={radioPoints}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </div>

                    <button type="submit">Submit</button>
                </Form>)}
            </Formik>


        </div>);
};

export { BonusPoints };
