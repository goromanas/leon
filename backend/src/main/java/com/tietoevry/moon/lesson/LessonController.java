package com.tietoevry.moon.lesson;


import com.tietoevry.moon.authorization.SecurityContextService;
import com.tietoevry.moon.authorization.model.MoonUserDetails;
import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lesson.model.LessonDto.LessonDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class LessonController {

    @Autowired
    LessonService lessonService;
    @Autowired
    SecurityContextService securityContextService;

    @RequestMapping(path = "/allLessons", method = RequestMethod.GET)
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @PreAuthorize("hasRole('ROLE_TEACHER') or hasRole('ROLE_STUDENT')")
    @RequestMapping(path = "/roleLessons", method = RequestMethod.GET)
    public List<LessonDto> getTeacherLessons() {
        MoonUserDetails userDetails = securityContextService.getCurrentUser();
        if((userDetails.getRoles().get(0).equals("TEACHER"))) {
            return lessonService.getTeacherLessons();
        }else if((userDetails.getRoles().get(0).equals("STUDENT"))){
            return lessonService.getStudentLessons();
        }
        return null;
    }


}
