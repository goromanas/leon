package com.tietoevry.moon.user.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {
    public long id;
    public String firstName;
    public String lastName;
    public List<String> role;
    public String username;
}
