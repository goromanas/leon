import React, { useState } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import { Button, Radio, Select, Alert } from 'antd';
import { motion } from 'framer-motion';

import { variantsUsersList, variantsUser } from 'app/page/timetable/animation';

import styles from './bonus-points.module.scss';

const { Option } = Select;

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
        { label: 0.5, value: 0.5, disabled: false },
        { label: 1, value: 1, disabled: false },
        { label: 2, value: 2, disabled: false },
    ];
    const [points, setPoints] = useState(null);
    const [user, setStudents] = useState('');
    const [alert, setAlert] = useState(false);
    const children: any = [];

    props.users.forEach((user: any) =>
        user.active === true ?
            children.push(<Option key={user.id} value={user.username} name={user.firstName}>{user.firstName} {user.lastName}</Option>)
            : null,
    );

    function handleChange(option: any): void {
        setStudents(option);
    }

    const handleWs = (): void => {
        props.ws.send(userToSend);
        setAlert(true);
        setTimeout(() => {
            props.onClose();
        }, 1500);
        setTimeout(() => {
            setAlert(false);
        }, 5000);

    };
    const radioPoints = (e: any) => {
        setPoints(e.target.value);
    };
    const userToSend = JSON.stringify({
        type: 'points',
        points,
        user,
    });
    console.log(!alert);
    return (

        <div >
            <Alert className={!alert ? styles.noShowSuccessMessage : styles.successMessage}
                banner={true} message={'Success!'} type="success" />

            <motion.div
                className={styles.bonusPoints}
                initial={false}
                animate={!props.show && !alert ? 'open' : 'closed'}
                variants={variantsUsersList}
            >

                <Formik
                    initialValues={{
                        picked: '',
                    }}
                    onSubmit={(
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>,
                    ) => {
                        setSubmitting(false);
                    }}
                >{({ values }) => (

                    <Form>
                        <motion.p key={1} variants={variantsUser} >Send
                points for most active <br />students!</motion.p>
                        <motion.div variants={variantsUser} key={3}>

                            <Select
                                className={styles.radioButtons}
                                placeholder="Select student"
                                allowClear={true}
                                onChange={handleChange}
                            >
                                {children}
                            </Select>

                        </motion.div>
                        <motion.div variants={variantsUser} role="group" style={{ display: 'flex', flexDirection: 'column' }} key={2}>

                            Select points
                            <Radio.Group
                                options={optionsWithDisabled}
                                onChange={radioPoints}
                                optionType="button"
                                buttonStyle="solid"
                            />

                        </motion.div>


                        <motion.div variants={variantsUser} key={4} style={{ display: 'flex' }}>

                            <Button disabled={points == null}className={styles.button} onClick={handleWs} type="primary">Send</Button>
                            <Button className={styles.button} onClick={props.onClose} type="default">Cancel</Button>

                        </motion.div>

                    </Form>
                )
                    }

                </Formik >

            </motion.div >
        </div>
    );
};

export { BonusPoints };
