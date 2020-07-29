import React from 'react';

interface OwnProps {
    loading: boolean;
    loader: React.ReactNode;
    children: React.ReactNode;
}

type Props = OwnProps;

const AsyncContent: React.FC<Props> = props => {
    const {
        loading,
        loader,
        children,
    } = props;

    return (
        <>
            {loading ? loader : children}
        </>
    );
};

export { AsyncContent };
