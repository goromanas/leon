package com.tietoevry.moon.lessonInformation;

import com.tietoevry.moon.lessonInformation.model.Assignment;
import com.tietoevry.moon.lessonInformation.model.Dto.LessonInformationDto;
import com.tietoevry.moon.lessonInformation.model.LessonInformation;
import com.tietoevry.moon.user.UserMapper;
import com.tietoevry.moon.user.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class LessonInformationService {
@Autowired
AssignmentRepository assignmentRepository;
@Autowired
LessonInformationRepository lessonInformationRepository;
    public LessonInformationDto createLessonInformation(LessonInformationDto lessonInformation) {
        Map<String, Assignment> assignmentsByName = assignmentRepository.findAll()
            .stream()
            .collect(Collectors.toMap(Assignment::getName, Function.identity()));
        LessonInformation savedLessonInformation = lessonInformationRepository
            .save(LessonInformationMapper.mapLessonInformationEntity(lessonInformation, assignmentsByName));
        return LessonInformationMapper.lessonInformationToDto(savedLessonInformation);
    }
}
