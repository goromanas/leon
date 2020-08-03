package com.tietoevry.moon.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
