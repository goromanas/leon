package com.tietoevry.moon.classroom;


import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.classroom.model.dto.ClassroomDto;
import com.tietoevry.moon.user.model.Role;
import com.tietoevry.moon.user.model.User;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

public class ClassroomMapper {

    public static ClassroomDto mapClassroomDto(Classroom classroom) {
        ClassroomDto ClassroomDto = new ClassroomDto();
        ClassroomDto.setId(classroom.getId());
        ClassroomDto.setClassroomName(classroom.getClassName());
        ClassroomDto.setUser(classroom.getUser());
        return ClassroomDto;
    }

//    public static Classroom mapClassroomEntity(ClassroomDto classroomDto, Map<String, User> usersByName) {
//        return Classroom.builder()
//            .id(classroomDto.getId())
//            .className(classroomDto.getClassroomName())
//            .user(classroomDto.getUser() != null
//                ? classroomDto.getUser().stream()
//                .map(usersByName::get)
//                .collect(Collector.toList()) : Collection.emptyList()).build();
//    }

}
