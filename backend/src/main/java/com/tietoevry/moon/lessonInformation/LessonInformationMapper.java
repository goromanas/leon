package com.tietoevry.moon.lessonInformation;

import com.tietoevry.moon.lesson.model.Lesson;
import com.tietoevry.moon.lessonInformation.model.Assignment;
import com.tietoevry.moon.lessonInformation.model.Dto.LessonInformationDto;
import com.tietoevry.moon.lessonInformation.model.LessonInformation;
import com.tietoevry.moon.user.model.Role;
import com.tietoevry.moon.user.model.User;
import com.tietoevry.moon.user.model.dto.UserDto;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

public class LessonInformationMapper {
    public static LessonInformationDto lessonInformationToDto(LessonInformation lessonInformation) {
        System.out.println("test");
        LessonInformationDto lessonInformationDto = new LessonInformationDto();
        lessonInformationDto.setTopic(lessonInformation.getTopic());
        lessonInformationDto.setDate(lessonInformation.getDate());
        lessonInformationDto.setInformation(lessonInformation.getInformation());
        lessonInformationDto.setId(lessonInformation.getId());
        lessonInformationDto.setLessonId(lessonInformation.getLesson().getId());
        lessonInformationDto.setAssignment(
            lessonInformation.getAssignment()
                .stream()
                .map(Assignment::getName)
                .collect(Collectors.toList()));
        return lessonInformationDto;
    }

    public static LessonInformation mapLessonInformationEntity(LessonInformationDto lessonInformationDto, Map<String, Assignment> assignmentsByName, Lesson lesson) {
        return LessonInformation.builder()
            .id(lessonInformationDto.getId())
            .date(lessonInformationDto.getDate())
            .topic(lessonInformationDto.getTopic())
            .information(lessonInformationDto.getInformation())
            .assignment(
                lessonInformationDto.getAssignment() != null
                    ? lessonInformationDto.getAssignment().stream()
                    .map(assignmentsByName::get)
                    .collect(Collectors.toList())
                    : Collections.emptyList()
            )
            .lesson(lesson).build();
    }
}
