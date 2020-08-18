package com.tietoevry.moon.lesson;


import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lesson.model.LessonDto.LessonDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

//    @PreAuthorize("hasRole('ROLE_TEACHER')")
//    @RequestMapping(path = "/lessonState/", method = RequestMethod.POST)
//    public void startLesson(@RequestBody LessonDto lessonDto) {
//        lessonService.changeLessonState(lessonDto);
//    }

    @PreAuthorize("hasRole('ROLE_STUDENT')")
    @RequestMapping(path = "/studentLessons", method = RequestMethod.GET)
    public List<LessonDto> getStudentLessons() {
        return lessonService.getStudentLessons();
    }

}
