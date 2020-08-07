import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavigationService } from 'app/service/navigation-service';
import { NotFoundPage } from 'app/page/not-found/not-found-page';
import { HomePage } from 'app/page/home/home-page';
import { VideoChatPage } from 'app/page/video-chat/video-chat-page';
import { UserDetails } from 'app/page/user-details/user-details';
import { ChatPage } from 'app/page/chat/chat-page';
import { UserList } from 'app/page/user-list/user-list';
import { TimetablePage } from 'app/page/timetable/timetable';
import { TopNavBar } from 'app/components/topnavbar/topnavbar';

class PrivatePage extends React.Component<{}, {}> {
    public render(): React.ReactNode {
        return (
            <>
                <TopNavBar/>
                <Router>
                    <Switch>
                        <Route path={NavigationService.HOME_PATH} component={HomePage} exact={true}/>
                        <Route path={NavigationService.VIDEO_CHAT_PATH} component={VideoChatPage} exact={true}/>
                        <Route path={NavigationService.PAGE_NOT_FOUND_PATH} component={NotFoundPage} exact={true}/>
                        <Route path={NavigationService.USER_LIST_PATH} component={UserList} exact={true}/>
                        <Route path={NavigationService.USER_DETAILS_PATH} component={UserDetails}/>
                        <Route path={NavigationService.CHAT_ROOM_PATH} component={ChatPage}/>
                        <Route path={NavigationService.USER_TIMETABLE_PATH} component={TimetablePage}/>
                        <Redirect to={NavigationService.PAGE_NOT_FOUND_PATH}/>
                    </Switch>
                </Router>

            </>
        );
    }
}

export { PrivatePage };
