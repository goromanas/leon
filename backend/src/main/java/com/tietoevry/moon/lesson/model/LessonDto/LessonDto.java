package com.tietoevry.moon.lesson.model.LessonDto;

import com.tietoevry.moon.lessonInformation.model.Dto.LessonInformationDto;
import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.subject.model.dto.SubjectDto;
import com.tietoevry.moon.user.model.dto.UserDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LessonDto {

    private Long id;
    private String subject;
    private String teacher;
    private String teacherUsername;
    private String video;
    private String className;
    private int time;
    private int day;
    private int status;
    private List<LessonInformationDto> lessonInformation;
}
