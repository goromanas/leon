package com.tietoevry.moon.lesson;


import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lesson.model.LessonDto.LessonDto;
import com.tietoevry.moon.lessonInformation.LessonInformationMapper;

import java.util.stream.Collectors;

public class LessonMapper {
    public static LessonDto mapLessonTo(Lesson lesson)
    {
        LessonDto lessonDto = new LessonDto();
        lessonDto.setId(lesson.getId());
        lessonDto.setStatus(lesson.getStatus());
        lessonDto.setSubject(lesson.getSubject().getName());
        lessonDto.setTeacher(lesson.getTeacher().getFirstName()+" "+lesson.getTeacher().getLastName());
        lessonDto.setVideo(lesson.getVideo());
        lessonDto.setTime(lesson.getTime());
        lessonDto.setDay(lesson.getDay());
        lessonDto.setClassName(lesson.getClassroom().getClassName());
        lessonDto.setLessonAssignment(
            lesson
                .getLessonInformation()
                .stream()
                .map(
                    LessonInformationMapper::lessonInformationToDto).collect(Collectors.toList()));
        return lessonDto;
    }

    public static Lesson MapLessonStatus(Lesson lesson, LessonDto lessonDto)
    {
     lesson.setStatus(lessonDto.getStatus());
     return lesson;
    }
}
