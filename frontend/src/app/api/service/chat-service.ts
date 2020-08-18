import { CancelSource, RestService } from 'app/api/common';

class ChatService {
    private static readonly CHAT_LESSON_PATH: string = '/subjectByStudent';
    private static readonly CHAT_SUBJECT_PATH: string = '/classroomByTeacher';

    private readonly restService: RestService;

    constructor(cancelSource: CancelSource = new CancelSource()) {
        this.restService = cancelSource.service;
    }

    public readonly getSubjects = (): Promise<Api.Subject[]> =>
  this.restService.get<Api.Subject[]>(`${ChatService.CHAT_LESSON_PATH}`);

  public readonly getClassrooms = (): Promise<Api.ClassroomDto[]> =>
  this.restService.get<Api.ClassroomDto[]>(`${ChatService.CHAT_SUBJECT_PATH}`);

  // public readonly getSocketUrl = (): string => {
  //   const loc = window.location;

  //   return loc.host === "localhost:3000" ? "ws://localhost:8080/ws/currentLesson" : "wss://java-menuo-su-it.northeurope.cloudapp.azure.com/ws/currentLesson";
  // };
}

const chatService = new ChatService();

export { chatService };
