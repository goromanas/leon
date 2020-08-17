package com.tietoevry.moon.classroom;

import com.tietoevry.moon.authorization.SecurityContextService;
import com.tietoevry.moon.classroom.model.dto.ClassroomDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class ClassroomController {
    @Autowired
    private ClassroomService classroomService;
    @Autowired
    public SecurityContextService securityContextService;

    @RequestMapping(path = "/classroom", method = RequestMethod.GET)
    public List<ClassroomDto> getClassrooms() {
        return classroomService.getClassrooms();
    }

    @RequestMapping(path = "/classroom/{id}", method = RequestMethod.GET)
    public ClassroomDto getClassroom(@PathVariable Long id) {
        return classroomService.getClassroom(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Classroom not found by id " + id));
    }

//    @RequestMapping(path = "/classroom", method = RequestMethod.POST)
//    public ClassroomDto createClassroom(@RequestBody ClassroomDto classroom) {
//        return classroomService.createClassroom(classroom);
//    }
//
//    @RequestMapping(path = "/classroom", method = RequestMethod.PUT)
//    public ClassroomDto updateClassroom(@RequestBody ClassroomDto classroom) {
//        return classroomService.updateClassroom(classroom);
//    }

    @RequestMapping(path = "/classroom/{id}", method = RequestMethod.DELETE)
    public void deleteClassroom(@PathVariable Long id) {
        classroomService.deleteClassroom(id);
    }

    @RequestMapping(path = "/classroomByTeacher", method = RequestMethod.GET)
    public List<ClassroomDto> getClassroomByTeacher() {
        return classroomService.getClassroomByTeacher();
    }
}
