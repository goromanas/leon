package com.tietoevry.moon.user.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private List<String> role;
    private String username;
    private String email;
}
