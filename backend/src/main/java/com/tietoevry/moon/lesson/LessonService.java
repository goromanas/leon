package com.tietoevry.moon.lesson;

import com.tietoevry.moon.authorization.SecurityContextService;
import com.tietoevry.moon.classroom.ClassroomService;
import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lesson.model.LessonDto.LessonDto;
import com.tietoevry.moon.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonService {
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ClassroomService classroomService;

    @Autowired
    public SecurityContextService securityContextService;

    public List<Lesson> getAllLessons()
    {
        return lessonRepository.findAll();
    }


    public List<LessonDto> getTeacherLessons() {
        return lessonRepository.findAllByTeacher(userService.getUserFromSession()).stream().map(LessonMapper::mapLessonTo).collect(Collectors.toList());
    }

    public List<LessonDto> getStudentLessons() {
        return lessonRepository.findAllByClassroom(classroomService.getClassroomFromUser(userService.getUserFromSession())).stream().map(LessonMapper::mapLessonTo).collect(Collectors.toList());
    }
}
