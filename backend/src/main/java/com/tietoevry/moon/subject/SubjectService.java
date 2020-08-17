package com.tietoevry.moon.subject;

import com.tietoevry.moon.classroom.ClassroomService;
import com.tietoevry.moon.lesson.LessonRepository;
import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Subject> getAllSubjects()
    {
        return subjectRepository.findAll();
    }
}
