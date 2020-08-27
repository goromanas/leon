import React from 'react';
import { Layout, Spin } from 'antd';

import { PageContent } from 'app/components/layout/page-content/page-content';

import { Spinner } from './spinner/spinner2';

import styles from './page-loading-spinner.module.scss';

const { Content } = Layout;

const PageLoadingSpinner: React.FC = () => (
    <Layout className={styles.container}>
        <Content>
            <PageContent >
                <Spinner theme={'login'} />
            </PageContent>
        </Content>
    </Layout>
);

export { PageLoadingSpinner };
