package com.tietoevry.moon.lesson;


import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lesson.model.LessonDto.LessonDto;
import com.tietoevry.moon.subject.SubjectService;
import com.tietoevry.moon.subject.model.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LessonController {

    @Autowired
    LessonService lessonService;

    @RequestMapping(path = "/allLessons", method = RequestMethod.GET)
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @PreAuthorize("hasRole('ROLE_TEACHER')")
    @RequestMapping(path = "/teacherLessons", method = RequestMethod.GET)
    public List<LessonDto> getTeacherLessons() {
        return lessonService.getTeacherLessons();
    }

}
