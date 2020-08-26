import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import styles from './bonus-points.module.scss';
import { Radio, Select } from 'antd';

const {Option} = Select;

interface props {
    users: any;
    ws: any;
}

const BonusPoints: React.FC<{ users: any, ws:any }> = (props) => {

    interface Values {
        picked: string;
    }

    const optionsWithDisabled = [
        {label: 0.5, value: 0.5, disabled: false},
        {label: 1, value: 1, disabled: false},
        {label: 2, value: 2, disabled: false},
    ];
    const [points, setPoints] = useState(null);
    const [user, setStudents] = useState([]);
    const children: any = [];

    props.users.forEach((user: any) =>
        user.active === true ?
            children.push(<Option key={user.id} value={user.username}>{user.username}</Option>)
            : null
    );

    function handleChange(value: any): void {
        setStudents(value);
    }


    const radioPoints = (e: any) => {
        console.log(user);
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
                    {setSubmitting}: FormikHelpers<Values>,
                ) => {
                    setTimeout(() => {
                        props.ws.send(JSON.stringify({
                            type: 'points',
                            points,
                            user,
                        }));
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
                    <Select placeholder="Select student" style={{width: 120}} allowClear onChange={handleChange}>
                        {children}
                    </Select>
                    <button type="submit">Submit</button>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export { BonusPoints };
