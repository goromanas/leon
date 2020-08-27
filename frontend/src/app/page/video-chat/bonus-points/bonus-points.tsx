import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import styles from './bonus-points.module.scss';
import { Button, Radio, Select, Alert } from 'antd';


const {Option} = Select;

interface Props {
    users: any;
    ws: any;
    show: boolean;
    onClose: any;
}

const BonusPoints: React.FC<Props> = (props) => {

    interface Values {
        picked: string;
    }

    const optionsWithDisabled = [
        {label: 0.5, value: 0.5, disabled: false},
        {label: 1, value: 1, disabled: false},
        {label: 2, value: 2, disabled: false},
    ];
    const [points, setPoints] = useState(null);
    const [user, setStudents] = useState('');
    const [alert,setAlert] = useState(false);
    const children: any = [];

    props.users.forEach((user: any) =>
        user.active === true ?
            children.push(<Option key={user.id} value={user.username}>{user.username}</Option>)
            : null
    );

    function handleChange(value: any): void {
        setStudents(value);
    }

    const handleWs = (): void => {
        props.ws.send(userToSend);
        setAlert(true);
        setTimeout(()=> {
            props.onClose();
        }, 1500)

    };
    const radioPoints = (e: any) => {
        setPoints(e.target.value);
    };
    const userToSend = JSON.stringify({
        type: 'points',
        points,
        user: user,
    });
    return (
        <div className={styles.bonusPoints}>
            <Alert className={!alert ? styles.noShowSuccessMessage : styles.successMessage}
                   banner message={"Acknowledgement was sent to " + user} type="success" />
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
                    setSubmitting(false);
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
                    <Select className={styles.radioButtons}placeholder="Select student"  allowClear onChange={handleChange}>
                        {children}
                    </Select>
                    <div style={{display: 'flex'}}>
                    <Button className={styles.button} onClick={handleWs} type="primary">Send</Button>
                    <Button className={styles.button} onClick={props.onClose} type="default">Cancel</Button>

                    </div>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export { BonusPoints };
