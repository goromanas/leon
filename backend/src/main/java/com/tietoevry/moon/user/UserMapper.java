package com.tietoevry.moon.user;

import com.tietoevry.moon.user.model.Role;
import com.tietoevry.moon.user.model.User;
import com.tietoevry.moon.user.model.dto.UserDto;

import java.util.stream.Collectors;

public class UserMapper {

    public static UserDto mapUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setRole(
            user.getRole()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList())
        );
        return userDto;
    }
}
