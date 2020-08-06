package com.tietoevry.moon.classroom;

import com.tietoevry.moon.classroom.model.Classroom;
import com.tietoevry.moon.classroom.model.dto.ClassroomDto;
import com.tietoevry.moon.user.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClassroomService {

    @Autowired
    private ClassroomRepository classroomRepository;

    public List<ClassroomDto> getClassrooms() {
        return classroomRepository.findAll().stream().map(ClassroomMapper::mapClassroomDto).collect(Collectors.toList());
    }

    public Optional<ClassroomDto> getClassroom(Long id) {
        return classroomRepository.findById(id).map(ClassroomMapper::mapClassroomDto);
    }

    public Optional<Classroom> getClassroomFromUser(Optional<User> user){
        return classroomRepository.findClassroomByUser(user);
    }

//    public ClassroomDto createClassroom(ClassroomDto classroom) {
//        return saveClassroom(classroom);
//    }
//
//    public ClassroomDto updateClassroom(ClassroomDto classroom) {
//        return saveClassroom(classroom);
//    }

    public void deleteClassroom(Long id) {
        classroomRepository.deleteById(id);
    }
//
//    private ClassroomDto saveClassroom(ClassroomDto classroom){
//        Classroom savedClassroom = classroomRepository
//            .save(ClassroomMapper.mapClassroomEntity(classroom));
//        return ClassroomMapper.mapClassroomDto(savedClassroom);
//    }
}
