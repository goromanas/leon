package com.tietoevry.moon.subject;

import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getAllSubjects()
    {
        return subjectRepository.findAll();
    }
}
