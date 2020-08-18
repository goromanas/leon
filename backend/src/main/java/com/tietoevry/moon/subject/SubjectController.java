package com.tietoevry.moon.subject;


import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.subject.model.dto.SubjectDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class SubjectController {

    @Autowired
    SubjectService subjectService;

    @RequestMapping(path = "/allSubjects", method = RequestMethod.GET)
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @RequestMapping(path = "/subjectByUser", method = RequestMethod.GET)
    public List<SubjectDto> getSubjectByUser() {
        return subjectService.getSubjectByUser();
    }

    @RequestMapping(path = "/subjectByTeacher", method = RequestMethod.GET)
    public Optional<SubjectDto> getSubjectByTeacher() {
        return subjectService.getSubjectByTeacher();
    }

}
