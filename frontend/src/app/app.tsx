import * as React from 'react';

import { AppStore } from 'app/store/app-store';
import { AppWithSession } from 'app/app-with-session';

import './style/ant-global.scss';

const App: React.FC = () => (
    <AppStore>
        <AppWithSession />
    </AppStore>
);

export { App };
