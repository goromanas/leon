import React, { FunctionComponent, useEffect, useState } from 'react';

const Counter: FunctionComponent<{ subject: string }> = (props) => {

    const [count, setCount] = useState(0);
    useEffect(() => {});

    return <>
            <p>Hello</p>
    </>;
};

export { Counter };
