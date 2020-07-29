package com.tietoevry.moon.user.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class User {
    @Id
    private long id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    @ManyToMany
    private List<Role> role;

}
