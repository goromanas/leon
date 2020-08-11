package com.tietoevry.moon.session.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginData {

    private String username;
    private String password;
    private Boolean rememberMe;

}
