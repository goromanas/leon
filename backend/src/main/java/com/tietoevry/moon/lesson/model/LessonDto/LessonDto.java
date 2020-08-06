package com.tietoevry.moon.lesson.model.LessonDto;

import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.subject.model.dto.SubjectDto;
import com.tietoevry.moon.user.model.dto.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonDto {

    private Long id;
    private String subject;
    private String teacher;
    private String video;
    private int status;
}
