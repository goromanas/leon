package com.tietoevry.moon.authorization;

import com.tietoevry.moon.authorization.model.MoonUserDetails;
import com.tietoevry.moon.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MoonUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).map(user -> new MoonUserDetails(
            user.getId(),
            user.getUsername(),
            user.getPassword(),
            user.getRole().name()
        ))
            .orElseThrow(() -> new UsernameNotFoundException("User was not found by username = " + username));
    }

}
