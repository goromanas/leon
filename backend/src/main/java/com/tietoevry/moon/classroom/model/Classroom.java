package com.tietoevry.moon.classroom.model;

import com.tietoevry.moon.user.model.Role;
import com.tietoevry.moon.user.model.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String className;
    @OneToMany
    private List<User> user;
}
