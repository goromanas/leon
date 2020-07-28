package com.tietoevry.moon.session;

import com.tietoevry.moon.session.model.LoginData;
import com.tietoevry.moon.session.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

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
        @RequestBody LoginData sessionRequest
    ) {
        return sessionService.createSession(httpServletRequest, sessionRequest.getUsername(), sessionRequest.getPassword());
    }

    @RequestMapping(path = "/session", method = RequestMethod.DELETE)
    public void deleteSession(HttpServletRequest httpServletRequest) {
        sessionService.deleteSession(httpServletRequest);
    }
}
