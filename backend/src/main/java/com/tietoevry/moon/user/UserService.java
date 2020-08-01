package com.tietoevry.moon.user;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tietoevry.moon.user.model.Role;
import com.tietoevry.moon.user.model.User;
import com.tietoevry.moon.user.model.dto.UserDto;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public List<UserDto> getUsers() {
        return userRepository
            .findAll()
            .stream()
            .map(UserMapper::mapUserDto)
            .collect(Collectors.toList());
    }

    public Optional<UserDto> getUser(long id) {
        return userRepository
            .findById(id)
            .map(UserMapper::mapUserDto);
    }

    public UserDto createUser(UserDto user) {
        return saveUser(user);
    }

    public UserDto updateUser(UserDto user) {
        return saveUser(user);
    }

    private UserDto saveUser(UserDto user) {
        Map<String, Role> rolesByName = roleRepository.findAll()
            .stream()
            .collect(Collectors.toMap(Role::getName, Function.identity()));
        User savedUser = userRepository
            .save(UserMapper.mapUserEntity(user, rolesByName));
        return UserMapper.mapUserDto(savedUser);
    }
}
