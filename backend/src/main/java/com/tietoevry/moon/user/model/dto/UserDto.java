package com.tietoevry.moon.user.model.dto;

import com.tietoevry.moon.user.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    public long id;
    public String firstName;
    public String lastName;
    public Role role;
    public String username;
}
