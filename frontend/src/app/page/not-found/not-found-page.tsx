import React from 'react';
import { Layout } from 'antd';

import { PageContent } from 'app/components/layout';

const { Content } = Layout;

const NotFoundPage: React.FC = () => (
    <Layout>
        <Content>
            <PageContent>
                <div>
                    TODO: implement "page not found"
                </div>
            </PageContent>
        </Content>
    </Layout>
);

export { NotFoundPage };
