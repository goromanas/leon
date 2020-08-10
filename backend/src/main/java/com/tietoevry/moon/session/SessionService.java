package com.tietoevry.moon.session;

import com.tietoevry.moon.authorization.SecurityContextService;
import com.tietoevry.moon.authorization.model.MoonUserDetails;
import com.tietoevry.moon.session.model.Session;
import com.tietoevry.moon.session.model.SessionUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class SessionService {

    @Autowired
    public SecurityContextService securityContextService;

    public Session getSession() {
        MoonUserDetails userDetails = securityContextService.getCurrentUser();

        if (userDetails == null) {
            return new Session(null);
        }

        return new Session(
            new SessionUser(userDetails.getUsername(),userDetails.getRoles())
        );
    }

    public Session createSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, String username, String password) {
        MoonUserDetails userDetails = securityContextService.createSession(httpServletRequest,httpServletResponse, username, password);

        return new Session(
            new SessionUser(userDetails.getUsername(),userDetails.getRoles())
        );
    }

    public void deleteSession(HttpServletRequest httpServletRequest) {
        securityContextService.deleteSession(httpServletRequest);
    }

}
