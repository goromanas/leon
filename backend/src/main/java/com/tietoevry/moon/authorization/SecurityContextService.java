package com.tietoevry.moon.authorization;

import com.tietoevry.moon.authorization.model.MoonUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.ServletWebRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Service
public class SecurityContextService {

    @Autowired
    public AuthenticationManager authenticationManager;
    @Autowired
    public TokenBasedRememberMeServices rememberMeService;

    public MoonUserDetails getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return principal instanceof MoonUserDetails ? (MoonUserDetails) principal : null;
    }

    public MoonUserDetails createSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, String username, String password, Boolean rememberMe) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            username,
            password
        );


        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(authentication);

        HttpSession session = httpServletRequest.getSession(true);
        session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, securityContext);
        if (rememberMe) {
            rememberMeService.loginSuccess(httpServletRequest, httpServletResponse, authentication);
        }
        return (MoonUserDetails) authentication.getPrincipal();
    }

    public void deleteSession(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        rememberMeService.logout(httpServletRequest, httpServletResponse, authentication);
        SecurityContextHolder.getContext().setAuthentication(null);
        SecurityContextHolder.clearContext();

        HttpSession session = httpServletRequest.getSession();
        if (session != null) {
            session.invalidate();
        }
    }

}
