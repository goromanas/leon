package com.tietoevry.moon.subject;

import com.tietoevry.moon.subject.model.Subject;
import com.tietoevry.moon.subject.model.dto.SubjectDto;

import java.util.Collections;
import java.util.stream.Collectors;

public class SubjectMapper {

    public static SubjectDto mapUserDto(Subject subject) {
        SubjectDto subjectDto = new SubjectDto();
        subjectDto.setId(subject.getId());
        subjectDto.setDescription(subject.getDescription());
        subjectDto.setName(subject.getName());
        return subjectDto;
    }

    public static Subject mapSubjectEntity(SubjectDto subjectDto) {
        return Subject.builder()
            .id(subjectDto.getId())
            .description(subjectDto.getDescription())
            .name(subjectDto.getName())
            .build();
    }
}
