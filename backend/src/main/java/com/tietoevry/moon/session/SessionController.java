package com.tietoevry.moon.session;

import com.tietoevry.moon.session.model.LoginData;
import com.tietoevry.moon.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class SessionController {

    @Autowired
    public SessionService sessionService;

    @RequestMapping(path = "/session", method = RequestMethod.GET)
    public Session getSession() {
        return sessionService.getSession();
    }

    @RequestMapping(path = "/session", method = RequestMethod.POST)
    public Session createSession(
        HttpServletRequest httpServletRequest,
        HttpServletResponse httpServletResponse,
        @RequestBody LoginData sessionRequest
    ) {
        return sessionService.createSession(httpServletRequest,httpServletResponse, sessionRequest.getUsername(), sessionRequest.getPassword(),sessionRequest.getRememberMe());
    }
    @RequestMapping(path = "/session", method = RequestMethod.DELETE)
    public void deleteSession(HttpServletRequest httpServletRequest,HttpServletResponse httpServletResponse) {
        sessionService.deleteSession(httpServletRequest,httpServletResponse);
    }
}
