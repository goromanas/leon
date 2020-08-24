package com.tietoevry.moon.user.model.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ActiveUserDto {
        private Long id;
        private String firstName;
        private String lastName;
        private String username;
        private Boolean active;
}
