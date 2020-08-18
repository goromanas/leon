package com.tietoevry.moon.subject;

import com.tietoevry.moon.classroom.ClassroomService;
import com.tietoevry.moon.lesson.LessonRepository;
import com.tietoevry.moon.lesson.LessonService;
import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lesson.model.LessonDto.LessonDto;
import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.subject.model.dto.SubjectDto;
import com.tietoevry.moon.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private ClassroomService classroomService;
    @Autowired
    private LessonService lessonService;

    public List<Subject> getAllSubjects()
    {
        return subjectRepository.findAll();
    }

    public List<SubjectDto> getSubjectByUser()
    {
        return lessonService.getStudentLessonsForChat().stream().map(Lesson::getSubject).map(SubjectMapper::mapSubjectDto).distinct().collect(Collectors.toList());
    }
}
