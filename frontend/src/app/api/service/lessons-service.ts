import { message } from 'antd';

import { CancelSource, RestService } from 'app/api/common';

class LessonsService {

    private static readonly TEACHER_LESSON_PATH: string = '/teacherLessons';
    private static readonly STUDENT_LESSON_PATH: string = '/studentLessons';
    private static readonly SCHEDULE_PATH: string = '/schedule';

    private readonly restService: RestService;

    constructor(cancelSource: CancelSource = new CancelSource()) {
        this.restService = cancelSource.service;
    }

    public readonly getTeacherLessons = (): Promise<Api.Lesson[]> =>
        this.restService.get<Api.Lesson[]>(`${LessonsService.TEACHER_LESSON_PATH}`);

    public readonly getStudentLessons = (): Promise<Api.Lesson[]> =>
        this.restService.get<Api.Lesson[]>(`${LessonsService.STUDENT_LESSON_PATH}`);

    public readonly getSchedule = (): Promise<Api.ScheduleDto[]> =>
        this.restService.get<Api.ScheduleDto[]>(`${LessonsService.SCHEDULE_PATH}`);

    public readonly connectToSocket = (ws: any) => {
        ws.onopen = () => {
            console.log('connected');
        };
    };
    // this.getSock();

    // ws.onmessage = (evt: any) => {
    //     console.log(evt.data);
    // };
    // public message: any = 9999;

    // private getSock = (): Promise<number> => (this.message);

}

const lessonsService = new LessonsService();

export { lessonsService };

// create new websocket instance
// const getSocketUrl = (): string => {
//     const loc = window.location;
//     let newUrl: string;
//     if (loc.host === 'localhost:3000') {
//         newUrl = 'ws://localhost:8080/ws/currentLesson';
//     } else {
//         newUrl = ' wss://java-menuo-su-it.northeurope.cloudapp.azure.com/ws/currentLesson';
//     }
//     return newUrl;
// };

// const ws = new WebSocket(getSocketUrl());
