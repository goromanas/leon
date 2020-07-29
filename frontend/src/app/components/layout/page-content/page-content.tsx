import React from 'react';
import classNames from 'classnames';

import styles from './page-content.module.scss';

interface OwnProps {
    children: React.ReactNode;
    className?: string;
}

type Props = OwnProps;

const PageContent: React.FC<Props> = (props: Props) => {
    const {
        children,
        className,
    } = props;

    const containerClassName: string = classNames(className, styles.pageContent);

    return (
        <div className={containerClassName}>
            {children}
        </div>
    );
};

export { PageContent };
