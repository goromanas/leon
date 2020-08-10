package com.tietoevry.moon.lesson;


import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lesson.model.LessonDto.LessonDto;

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
        lessonDto.setClassName(lesson.getClassroom().getClassName());
        return lessonDto;
    }

    public static Lesson MapLessonStatus(Lesson lesson, LessonDto lessonDto)
    {
     lesson.setStatus(lessonDto.getStatus());
     return lesson;
    }
}
