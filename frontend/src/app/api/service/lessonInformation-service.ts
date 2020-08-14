import { CancelSource, RestService } from 'app/api/common';

class LessonInformationService {

    private static readonly LESSON_INFORMATION_PATH: string = '/lessonInformation';

    private readonly restService: RestService;

    constructor(cancelSource: CancelSource = new CancelSource()) {
        this.restService = cancelSource.service;
    }

    public readonly PostLessonInformation = (assignment: string[], date: string, id: number, information: string, topic: string): Promise<Api.LessonInformationDto> =>
        this.restService.post<Api.LessonInformationDto>(LessonInformationService.LESSON_INFORMATION_PATH, {
            assignment,
            date,
            id,
            information,
            topic,
        });

}

const lessonInformationService = new LessonInformationService();

export { lessonInformationService, LessonInformationService };
