package com.tietoevry.moon.user;

import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

import com.tietoevry.moon.user.model.Role;
import com.tietoevry.moon.user.model.User;
import com.tietoevry.moon.user.model.dto.ActiveUserDto;
import com.tietoevry.moon.user.model.dto.UserDto;

public class UserMapper {

    public static UserDto mapUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setPoints(user.getPoints());
        userDto.setEmail(user.getEmail());
        userDto.setRole(
            user.getRole()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList())
        );
        return userDto;
    }
    public static ActiveUserDto mapUserActiveDto(User user) {
        ActiveUserDto userDto = new ActiveUserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setFirstName(user.getFirstName());
        userDto.setPoints(user.getPoints());
        userDto.setLastName(user.getLastName());
        userDto.setActive(false);
        return userDto;
    }

    public static User mapUserEntity(UserDto userDto, Map<String, Role> rolesByName) {
        return User.builder()
            .id(userDto.getId())
            .firstName(userDto.getFirstName())
            .lastName(userDto.getLastName())
            .username(userDto.getUsername())
            .email(userDto.getEmail())
            .role(
                userDto.getRole() != null
                    ? userDto.getRole().stream()
                    .map(rolesByName::get)
                    .collect(Collectors.toList())
                    : Collections.emptyList()
            ).build();
    }
}
