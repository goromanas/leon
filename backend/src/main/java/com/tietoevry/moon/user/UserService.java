package com.tietoevry.moon.user;

import com.tietoevry.moon.user.model.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public List<UserDto> getUsers() {
        return userRepository
            .findAll()
            .stream()
            .map(user -> userMapper.mapUserDto(user))
            .collect(Collectors.toList());
    }
}
