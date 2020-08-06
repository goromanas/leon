import React from 'react';
import { Form, Input } from 'antd';

class Field extends React.Component {
    public render(): React.ReactNode {
        return (
            <Form.Item>
                <Input />
            </Form.Item>
        );
    }
}

export { Field };
