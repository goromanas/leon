package com.tietoevry.moon.session;

import com.tietoevry.moon.authorization.SecurityContextService;
import com.tietoevry.moon.authorization.model.MoonUserDetails;
import com.tietoevry.moon.session.model.Session;
import com.tietoevry.moon.session.model.SessionUser;
import com.tietoevry.moon.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Time;

@Service
public class SessionService {

    @Autowired
    public SecurityContextService securityContextService;

    @Autowired
    public UserService userService;


    public Session getSession() {
        MoonUserDetails userDetails = securityContextService.getCurrentUser();

        if (userDetails == null) {
            return new Session(null);
        }

        return new Session(
            new SessionUser(userDetails.getUsername(),userDetails.getRoles(),
                userService.getUsersByUsername(userDetails.getUsername()).getFirstName(),
                userService.getUsersByUsername(userDetails.getUsername()).getLastName()));
    }

    public Session createSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, String username, String password, Boolean rememberMe) {
        MoonUserDetails userDetails = securityContextService.createSession(httpServletRequest,httpServletResponse, username, password,rememberMe);

        return new Session(
            new SessionUser(userDetails.getUsername(),userDetails.getRoles(),
                userService.getUsersByUsername(userDetails.getUsername()).getFirstName(),
                userService.getUsersByUsername(userDetails.getUsername()).getLastName()));
    }

    public void deleteSession(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
        securityContextService.deleteSession(httpServletRequest,httpServletResponse);
    }

}
