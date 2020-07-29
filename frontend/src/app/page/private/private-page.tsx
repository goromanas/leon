import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavigationService } from 'app/service/navigation-service';
import { NotFoundPage } from 'app/page/not-found/not-found-page';
import { HomePage } from 'app/page/home/home-page';

class PrivatePage extends React.Component<{}, {}> {

    public render(): React.ReactNode {
        return (
            <Router>
                <Switch>
                    <Route
                        path={NavigationService.HOME_PATH}
                        component={HomePage}
                        exact={true}
                    />
                    <Route
                        path={NavigationService.PAGE_NOT_FOUND_PATH}
                        component={NotFoundPage}
                        exact={true}
                    />
                    <Redirect to={NavigationService.PAGE_NOT_FOUND_PATH} />
                </Switch>
            </Router>
        );
    }

}

export { PrivatePage };
