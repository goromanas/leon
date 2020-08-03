package com.tietoevry.moon.user;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tietoevry.moon.user.model.dto.UserDto;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserDto> getUsers() {
        return userRepository
            .findAll()
            .stream()
            .map(UserMapper::mapUserDto)
            .collect(Collectors.toList());
    }
}
