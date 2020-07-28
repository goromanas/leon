package com.tietoevry.moon.session.model;

import lombok.Getter;

@Getter
public class SessionUser {

    private String username;

    public SessionUser(String username) {
        this.username = username;
    }
}
