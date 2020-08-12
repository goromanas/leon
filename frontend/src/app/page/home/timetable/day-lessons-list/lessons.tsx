import React from 'react';
import { Button, Modal } from 'antd';
// @ts-ignore
import { navigationService } from 'app/service/navigation-service';

import styles from './lessons.module.scss';
import { Counter } from 'app/components/modalContent/modalContent';

interface Props {
    lessonsList: Api.Lesson[];
    currentLesson: number;
    userRole: any;
}

interface State {
    // currentLesson: number;
    visible: boolean;
    activeModal: any

}

class Lessons extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {visible: false, activeModal: null};
        // this.state = { currentLesson: 2 };
        // this.handleData = this.handleData.bind(this);
    }

    showModal = (index: number) => {
        this.setState({
            activeModal: index,
        });
    };
    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            activeModal: null
        });
    };
    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            activeModal: null
        });
    };

    public modalButton = (): boolean => {
        return this.props.userRole[0] === 'STUDENT' || this.props.userRole[0] === 'PARENT';
    };

    public render(): React.ReactNode {
        const {lessonsList, currentLesson} = this.props;
        const activeLesson = {backgroundColor: '#636363', color: '#000000'};
        const upcomingLesson = {backgroundColor: '#929292', color: '#000000'};
        const positionInList = (e: any) => lessonsList.indexOf(e) + 1;
        console.log(this.props);
        const allLessons = this.props.lessonsList.map((item: any) => (

            <li className={styles.listItem} key={item.id}>
                {this.modalButton() ?
                    <Modal
                        key={item.id}
                        title={item.subject}
                        visible={this.state.activeModal === item.id}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        okButtonProps={{
                            children: 'Custom OK'
                        }}
                    >
                        <Counter subject={item.subject}/>
                    </Modal> :
                    <Modal
                        key={item.id}
                        title={item.subject}
                        visible={this.state.activeModal === item.id}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        // footer={this.modalButton() ? ' ' : ' '}
                        okButtonProps={{
                            children: 'Custom OK'
                        }}
                    >

                        <p>{item.subject}</p>
                        <p>{this.props.userRole}</p>
                        <p>{this.modalButton() ? 'tiesa' : 'netiesa'}</p>

                    </Modal>}


                <div className={styles.classNumber}
                     style={positionInList(item) === currentLesson ? activeLesson
                         : positionInList(item) > currentLesson ? upcomingLesson : null}>
                    {lessonsList.indexOf(item) + 1}.
                </div>
                <div className={styles.listContent} onClick={() => this.showModal(item.id)}
                     style={positionInList(item) === currentLesson ? activeLesson
                         : positionInList(item) > currentLesson ? upcomingLesson : null}>
                    {item.subject}
                    {positionInList(item) === currentLesson ? (
                        <Button
                            type="primary"
                            className={styles.toVideoButton}
                            onClick={() => this.handleOpenClassroom(item.id)}
                        >
                            Prisijungti į pamoką
                        </Button>
                    ) : null}
                </div>

            </li>
        ));

        return (
            <div>
                {/*<Websocket url="ws://localhost:8080/currentLesson"*/}
                {/*           onMessage={this.handleData}*/}
                {/*           debug={true}/>*/}
                <h1 className={styles.classListHeader}>Šiandienos pamokos({lessonsList.length})</h1>
                <ul className={styles.list}>{allLessons}</ul>

            </div>
        );
    }

    //
    // private handleData(data: any): void {
    //     const result = JSON.parse(data);
    //
    //     this.setState({currentLesson: result});
    //     // console.log(result)
    // }

    private readonly handleOpenClassroom = (id?: number): void => {
        navigationService.redirectToVideoChat(id);
    };
}

export { Lessons };
