import React from 'react';
import { Button } from 'antd';

import { navigationService } from 'app/service/navigation-service';

interface Props {
    status: number | null;
    subject: string | null;
}

class LessonAction extends React.Component<Props> {

    public render(): React.ReactNode {

        const { status } = this.props;

        return (
            <div>
                {status === 1 ? <Button type="primary" onClick={this.handleClickToVideoChat}>Live class</Button> : null}
            </div>
        );
    }

    private readonly handleClickToVideoChat = (): void => {
        navigationService.redirectToVideoChat();
    };
}

export { LessonAction };
