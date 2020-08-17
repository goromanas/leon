package com.tietoevry.moon.classroom.model.dto;

import com.tietoevry.moon.user.model.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.OneToMany;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
public class ClassroomDto {
    private Long id;
    private String classroomName;
    private List<User> user;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClassroomDto that = (ClassroomDto) o;
        return classroomName.equals(that.classroomName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(classroomName);
    }
}
