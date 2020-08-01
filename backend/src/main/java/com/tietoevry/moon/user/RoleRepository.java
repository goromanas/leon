package com.tietoevry.moon.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tietoevry.moon.user.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
