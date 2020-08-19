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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Column(insertable = false, updatable = false)
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> role;

}
