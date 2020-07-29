import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LoginPage } from 'app/page/login/login-page';
import { NavigationService } from 'app/service/navigation-service';
import { LogoutPage } from 'app/page/logout/logout-page';
import { PrivatePage } from 'app/page/private/private-page';
import { CheckAuth } from 'app/page/private/check-auth';

const IndexPage: React.FC = () => (
    <Router>
        <Switch>
            <Route
                path={NavigationService.LOGIN_PATH}
                component={LoginPage}
                exact={true}
            />
            <CheckAuth>
                <Route
                    path={NavigationService.LOGOUT_PATH}
                    component={LogoutPage}
                    exact={true}
                />
                <Route
                    path={NavigationService.HOME_PATH}
                    component={PrivatePage}
                />
            </CheckAuth>
        </Switch>
    </Router>
);

export { IndexPage };
