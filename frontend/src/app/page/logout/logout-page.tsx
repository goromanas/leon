import React from 'react';

import { navigationService } from 'app/service/navigation-service';
import { sessionService } from 'app/api/service/session-service';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { loggerService } from 'app/service/logger-service';

class LogoutPage extends React.Component<{}, {}> {

    public componentDidMount(): void {
        sessionService.logout()
            .then(() => { navigationService.redirectToLoginPage(); })
            .catch(error => { loggerService.error('Error occurred when logging out', error); });
    }

    public render(): React.ReactNode {
        return (
            <PageLoadingSpinner />
        );
    }

}

export { LogoutPage };
