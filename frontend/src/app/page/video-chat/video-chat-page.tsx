import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { Layout } from 'antd';
import Jitsi from 'react-jitsi';
import { Button, Modal } from 'antd';

import { connectContext, SettingsProps } from 'app/context';
import { AsyncContent, PageContent } from 'app/components/layout';
import { navigationService } from 'app/service/navigation-service';
import { lessonsService } from 'app/api/service/lessons-service';
import { AnswerQuiz } from 'app/page/video-chat/answerQuiz';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { QuizResult } from 'app/page/video-chat/quizResult';

// @ts-ignore
import { Top } from './top/top';

import styles from './video-chat-page.module.scss';
import { VideoButton } from 'app/page/video-chat/video-buttons/video-button';
import { QuizCreate } from 'app/page/video-chat/quizCreate';

const {Content, Sider} = Layout;

interface ContextProps {
    username: string | null;
    firstName: string | null;
    teacherLessons: Api.LessonDto[];
    userRoles: string[] | null;
    schedule: Api.ScheduleDto[];
}

interface quizMessageForStudent {
    classroom: string;
    teacherUsername: number;
    question: string;
    options: { id: number, name: string }[];
    correct: number;
    timer: number;
}

interface quizAnswer {
    studentName: string;
    answer: number;
}

type OwnProps = RouteComponentProps<Params>;

interface Params {
    id: string;
}

interface State {
    type: string;
    quizMessageForStudent: quizMessageForStudent;
    visible: boolean;
    value: number;
    answers: quizAnswer[];
    correct:number;
}

type Props = OwnProps & ContextProps;

class HomePageComponent extends React.Component<Props, State> {
    public readonly state: State = {
        type: null,
        quizMessageForStudent: null,
        visible: false,
        value: 0,
        answers: [],
        correct:1,
    };

    public showModal = () => {
        this.setState({
            visible: true,
        });
    };

    public handleOk = () => {
        this.setState({
            visible: false,
        });
        const answer = {
            type: 'answer',
            answer: this.state.value,
            teacherUsername: this.state.quizMessageForStudent.teacherUsername,
            studentName: this.props.username,
        };
        console.log('aaaaaaaaaaaa');
        this.ws.send(JSON.stringify(answer));
    this.setState({quizMessageForStudent:null})
        console.log(this.state.value);
    };

    public handleCancel = () => {
        console.log();
        this.setState({
            visible: false,
        });
    };
    public updateQuiz = (values: any,value:any) => {
        this.setState({correct:value})
        this.sendMessage(values);
        this.handleCancel()
    };

    public readonly getSocketUrlQuiz = (): string => {
        const loc = window.location;

        return (loc.host === 'localhost:3000') ? 'ws://localhost:8080/ws/lessonQuiz'
            : 'wss://java-menuo-su-it.northeurope.cloudapp.azure.com/ws/lessonQuiz';
    };

    public ws = new WebSocket(this.getSocketUrlQuiz());

    public componentDidMount() {
        this.ws.onopen = () => {
            // tslint:disable-next-line: no-console
        };
        this.ws.onmessage = e => {
            this.setState({quizMessageForStudent: null});
            const message = JSON.parse(e.data);
            this.setState({type: message.type});
            if (message.type === 'question') {
                this.showModal();
                this.setState({quizMessageForStudent: message});
            } else {
                const copyAnswers = [...this.state.answers];
                const newAnswers = [...copyAnswers, message];

                this.setState({
                    answers: newAnswers,
                });
                console.log(this.state.answers);
                this.showModal();
            }
        };
    }

    public sendMessage = (values: any): void => {
        const question =
            {
                type: 'question',
                classroom: this.props.teacherLessons[0].className,
                teacherUsername: this.props.username,
                question: values.question,
                options: values.options?.map((item: string) => ({
                    id: values.options.indexOf(item)+1,
                    name: item,
                })),
                timer: values.timer
            };
        console.log(question);
        this.ws.send(JSON.stringify(question));

     //   this.ws.send('{"type":"question","classroom":"6A", "teacherUsername":"tecmokytojas", "question": "Is this legit?", "options": [{"id":"1", "name":"Option 1"},{"id":"2", "name":"Option 2"}],"correct":"1","timer":"1"}');
    };

    public openQuiz = (values: any): void => {
        this.setState({type: 'create'});
        this.showModal();
    };

    public render(): React.ReactNode {
        const {
            username,
            firstName,
            teacherLessons,
            userRoles,
            schedule,
            match: {
                params: {id},
            },
        } = this.props;
        const currentLesson = teacherLessons && teacherLessons.filter((lesson) => lesson.id === parseInt(id, 10));

        const isUserInWrongVideoRoom = teacherLessons &&
            !teacherLessons.map(lesson => lesson.id).includes(parseInt(id, 10));

        if (isUserInWrongVideoRoom) {
            navigationService.redirectToDefaultPage();
        }
        const videoChatName: string = currentLesson && currentLesson[0].video.toString();
        const currentLessonTimeObj = currentLesson && schedule[currentLesson[0].time - 1];

        let lessonTitle: string;
        let startTime: string;
        let endTime: string;
        if (currentLessonTimeObj) {
            lessonTitle = currentLesson[0].className + ' ' + currentLesson[0].subject;
            startTime = currentLessonTimeObj.startTime;
            endTime = currentLessonTimeObj.endTime;
        }

        return (
// <<<<<<< HEAD
//             <Layout >
//                 <Content style={{ margin: 'auto', width: '70%', background: 'white' }}>
// =======
            <Layout>

                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={false}
                >
                    {this.state.type === 'question' ?
                        <AsyncContent loading={!this.state.quizMessageForStudent} loader={<PageLoadingSpinner/>}>
                            <AnswerQuiz message={this.state.quizMessageForStudent}
                                        changeValue={this.changeValue}
                                        onSuccess={() => this.handleOk()}
                                        onCancel={() => this.handleCancel()}
                                        visible={this.state.visible}
                            /> </AsyncContent>
                        : this.state.type === 'answer' ?
                            <AsyncContent loading={!this.state.answers} loader={<PageLoadingSpinner/>}>
                                <QuizResult answers={this.state.answers}
                                            correct={this.state.correct}
                                />

                            </AsyncContent>
                            :
                            <QuizCreate updateQuiz={this.updateQuiz}
                            />}
                </Modal>
                <Content style={{margin: 'auto', width: '70%'}}>
{/*>>>>>>> master*/}
                    <PageContent>

                        <Top lessonTitle={lessonTitle}
                             teacher={currentLesson && currentLesson[0].teacher}
                             startTime={startTime}
                             endTime={endTime}
                        />

                        {videoChatName && (
                            <Jitsi
                                containerStyle={{marginLeft: '61px'}}
                                frameStyle={{display: 'block', width: '1012px', height: '443px'}}
                                jwt="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaHR0cHM6Ly9hdmF0YXJzLmRpY2ViZWFyLmNvbS9hcGkvbWFsZS9tZW51by1zdS1pdC5zdmciLCJuYW1lIjoiTcSXbnVvIHN1IElUIn19LCJhdWQiOiJtZW51b19zdV9pdCIsImlzcyI6Im1lbnVvX3N1X2l0Iiwic3ViIjoibWVldC5qaXRzaSIsInJvb20iOiIqIn0.6CKZU_JWLhtj9eKJ-VdFGQZyRzvTZz29fn7--_dp-jw"
                                roomName={videoChatName}
                                domain="video-menuo-su-it.northeurope.cloudapp.azure.com:443"
                                userInfo={{email: username}}
                                displayName={username}
                                onAPILoad={handleCallEnd}
                                config={{
                                    startAudioMuted: 1,
                                    remoteVideoMenu: {
                                        disableKick: userRoles[0] === 'STUDENT',
                                    },
                                    disableRemoteMute: userRoles[0] === 'STUDENT',
                                }}
                                interfaceConfig={userRoles[0] === 'STUDENT' &&
                                {
                                    TOOLBAR_BUTTONS: [
                                        'microphone', 'camera', 'desktop', 'fullscreen', 'raisehand', 'hangup', 'chat',
                                        'tileview', 'download', 'videoquality', 'filmstrip', 'invite', 'feedback',
                                        'stats', 'shortcuts',
                                    ],
                                } || {

                                    SHOW_WATERMARK_FOR_GUESTS: false, SHOW_JITSI_WATERMARK: false,
                                }
                                }
                            />
                        )}

                    </PageContent>
                </Content>
                <Sider width='282px' className={styles.sider}>

                    <VideoButton role={userRoles}
                                 openQuiz={this.openQuiz}/>

                </Sider>
            </Layout>
        );
    }

    private readonly changeValue = (number: number) => {
        this.setState({value: number});
    };

    private readonly generateUniqueName = (subject: string, video: string): string =>
        subject + ' ' + video;

    private readonly handleClickToDefaultPage = (): void => {
        navigationService.redirectToDefaultPage();
    };
}

const handleCallEnd = (api: any) => {
    api.executeCommand('startRecording', {
        mode: 'file',
        shouldShare: true,
    });

    api.addEventListener('readyToClose', () => {
        navigationService.redirectToDefaultPage();
    });
};

const mapContextToProps = ({session: {user}, lessons, schedule}: SettingsProps): ContextProps => ({
    username: user != null ? user.username : null,
    firstName: user != null ? user.firstName : null,
    userRoles: user.roles,
    teacherLessons: lessons,
    // studentLessons: lessons,
    schedule,
});

const VideoChatPage = connectContext(mapContextToProps)(HomePageComponent);

export { VideoChatPage };
