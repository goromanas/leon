import * as React from 'react';
import { Redirect } from 'react-router';

import { NavigationService } from 'app/service/navigation-service';
import { connectContext, SettingsProps } from 'app/context';

interface ContextProps {
    authenticated: boolean;
}

interface OwnProps {
    children: React.ReactNode;
}

type Props = OwnProps & ContextProps;

class CheckAuthComponent extends React.Component<Props, {}> {

    public render(): React.ReactNode {
        const {
            authenticated,
            children,
        } = this.props;

        if (!authenticated) {
            return (
                <Redirect to={NavigationService.LOGIN_PATH} />
            );
        }

        return children;
    }

}

const mapContextToProps = ({ session: { authenticated } }: SettingsProps): ContextProps => ({
    authenticated,
});

const CheckAuth = connectContext(mapContextToProps)(CheckAuthComponent);

export { CheckAuth };
