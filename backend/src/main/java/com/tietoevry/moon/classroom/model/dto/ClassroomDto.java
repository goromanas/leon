package com.tietoevry.moon.classroom.model.dto;

import com.tietoevry.moon.user.model.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
public class ClassroomDto {
    private Long id;
    private String classroomName;
    private List<User> user;
}
