package com.tietoevry.moon.user.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class Role {
    @Id
    private Long id;
    private String name;
}
