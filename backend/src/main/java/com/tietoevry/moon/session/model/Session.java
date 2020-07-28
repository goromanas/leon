package com.tietoevry.moon.session.model;

import lombok.Getter;

@Getter
public class Session {

    private SessionUser user;

    public Session(SessionUser user) {
        this.user = user;
    }
}
