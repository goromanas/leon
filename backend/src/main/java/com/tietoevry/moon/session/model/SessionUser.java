package com.tietoevry.moon.session.model;

import lombok.Getter;

import java.util.List;

@Getter
public class SessionUser {

    private String username;
    private List<String> roles;

    public SessionUser(String username, List<String> roles) {
        this.username = username;
        this.roles = roles;
    }
}
