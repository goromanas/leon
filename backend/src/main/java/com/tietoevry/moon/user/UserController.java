package com.tietoevry.moon.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.tietoevry.moon.user.model.dto.UserDto;

@RestController
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.GET)
    public UserDto getUser(@PathVariable Long id) {
        return userService.getUser(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found by id " + id));
    }

    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public UserDto createUser(UserDto user) {
        return userService.createUser(user);
    }

    @RequestMapping(path = "/user", method = RequestMethod.PUT)
    public UserDto updateUser(UserDto user) {
        return userService.updateUser(user);
    }
}
